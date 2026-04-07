"use client";

/**
 * Fork of `@prismicio/next` `SliceSimulator` with a fixed `hasSlices` check.
 *
 * Upstream only uses `getSlices(window.location)` — on the server `window` is
 * undefined, so `hasSlices` is always false and the wrapper renders **no
 * children** (blank preview). The Page Builder iframe also depends on the
 * slice zone being mounted for postMessage / simulator APIs; starting from
 * “no children” makes that fragile.
 *
 * We also treat the server-parsed slice zone (`serverSliceCount`) as proof
 * that slices exist, matching the `state` search param the RSC page already read.
 */
import { getSlices } from "@prismicio/next";
import {
  SimulatorManager,
  StateEventType,
  disableEventHandler,
  getDefaultMessage,
  getDefaultProps,
  onClickHandler,
  simulatorClass,
  simulatorRootClass,
} from "@prismicio/simulator/kit";
import type { SliceSimulatorProps as BaseSliceSimulatorProps } from "@prismicio/simulator/kit";
import { compressToEncodedURIComponent } from "lz-string";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { FC, FormEventHandler, MouseEventHandler, ReactNode } from "react";

const STATE_PARAMS_KEY = "state";

const simulatorManager = new SimulatorManager();

/** Same behavior as `@prismicio/next` `SliceSimulatorWrapper` (not exported publicly). */
function SliceSimulatorWrapper({
  className,
  children,
  zIndex,
  background,
  message,
  hasSlices,
}: {
  className?: string;
  children: ReactNode;
  zIndex?: number;
  background?: string;
  message: string;
  hasSlices: boolean;
}) {
  const defaultProps = getDefaultProps();
  return (
    <div
      className={[simulatorClass, className].filter(Boolean).join(" ")}
      style={{
        zIndex: typeof zIndex === "undefined" ? defaultProps.zIndex : zIndex ?? undefined,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        overflow: "auto",
        background:
          typeof background === "undefined"
            ? defaultProps.background
            : background ?? undefined,
      }}
    >
      {message ? (
        <article dangerouslySetInnerHTML={{ __html: message }} />
      ) : hasSlices ? (
        <div
          id="root"
          className={simulatorRootClass}
          onClickCapture={
            onClickHandler as unknown as MouseEventHandler<HTMLDivElement>
          }
          onSubmitCapture={
            disableEventHandler as unknown as FormEventHandler<HTMLDivElement>
          }
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}

export type TokaiSliceSimulatorProps = BaseSliceSimulatorProps & {
  children: ReactNode;
  className?: string;
  /** From the RSC page (`getSlices(searchParams.state)`); used for SSR + iframe reliability. */
  serverSliceCount: number;
};

export const TokaiSliceSimulator: FC<TokaiSliceSimulatorProps> = ({
  children,
  background,
  zIndex,
  className,
  serverSliceCount,
}) => {
  const [message, setMessage] = useState(() => getDefaultMessage());
  const router = useRouter();

  const urlState =
    typeof window !== "undefined"
      ? new URL(window.location.href).searchParams.get(STATE_PARAMS_KEY)
      : undefined;
  const hasSlices =
    getSlices(urlState).length > 0 || serverSliceCount > 0;

  /**
   * `SimulatorManager.init()` can set a non-empty “accessed outside iframe” HTML
   * message while internal `state.slices` is still `[]` (parent hasn’t posted
   * `SetSliceZone` yet). The wrapper renders `message` *instead of* children,
   * which wipes a perfectly valid SSR `<SliceZone />` → blank preview.
   * Never let that message replace real slice content.
   */
  const displayMessage = hasSlices ? "" : message;

  useEffect(() => {
    simulatorManager.state.on(
      StateEventType.Slices,
      (newSlices) => {
        const url = new URL(window.location.href);
        url.searchParams.set(
          STATE_PARAMS_KEY,
          compressToEncodedURIComponent(JSON.stringify(newSlices)),
        );

        window.history.replaceState(null, "", url);
        setTimeout(() => router.refresh(), 0);
      },
      "simulator-slices",
    );
    simulatorManager.state.on(
      StateEventType.Message,
      (newMessage) => setMessage(newMessage),
      "simulator-message",
    );

    simulatorManager.init();

    return () => {
      simulatorManager.state.off(StateEventType.Slices, "simulator-slices");
      simulatorManager.state.off(StateEventType.Message, "simulator-message");
    };
  }, [router]);

  return (
    <SliceSimulatorWrapper
      message={displayMessage}
      hasSlices={hasSlices}
      background={background}
      zIndex={zIndex}
      className={className}
    >
      {children}
    </SliceSimulatorWrapper>
  );
};
