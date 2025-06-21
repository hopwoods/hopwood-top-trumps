import type {
  Observer,
  InspectionEvent
} from 'xstate'
// StateFrom, AnyStateMachine, EventObject, AnyActorRef were unused or causing issues.

// This observer can be attached to a machine's `inspect` property
// to log detailed information to the console during development.
export const appMachineInspector: Observer<InspectionEvent> = {
  next: (inspectionEvent: InspectionEvent) => {
    // Log events sent to actors
    if (inspectionEvent.type === '@xstate.event') {
      // Filter out noisy internal XState events for cleaner logs
      const eventType = inspectionEvent.event.type
      if (
        eventType.startsWith('xstate.init') ||
        eventType.startsWith('xstate.stop') ||
        eventType.startsWith('xstate.promise') ||
        eventType.startsWith('xstate.after') ||
        eventType.startsWith('done.invoke') ||
        eventType.startsWith('error.platform') ||
        eventType.startsWith('xstate.assign') // Can be very noisy if you have many assigns
      ) {
        return
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Bypassing complex type issue for dev tool
      const actorId: string = (inspectionEvent.actorRef as any)?.id ?? 'unknown_actor';
      console.groupCollapsed(
        `%cEVENT %c${eventType} %c(Actor: ${actorId}, Source: ${inspectionEvent.sourceRef?.sessionId ?? 'external'})`,
        'color: gray; font-weight: lighter;',
        'color: dodgerblue; font-weight: bold;',
        'color: gray; font-weight: lighter;',
      )
      console.log('Event Data:', inspectionEvent.event)
      console.groupEnd()
    }
    // Log actor snapshots (state changes)
    else if (inspectionEvent.type === '@xstate.snapshot') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Inspector dev tool, type safety for snapshot is complex
      const snapshot = inspectionEvent.snapshot as any;

      // Optionally filter which actor snapshots to log
       // if ((inspectionEvent.actorRef as any).id !== 'app') return;

      const stateValueString = typeof snapshot.value === 'undefined' ? 'undefined' : JSON.stringify(snapshot.value);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Bypassing complex type issue for dev tool
      const actorIdForSnapshot: string = (inspectionEvent.actorRef as any)?.id ?? 'unknown_actor';
      console.groupCollapsed(
        `%cSNAPSHOT %c${stateValueString} %c(Actor: ${actorIdForSnapshot})`,
        'color: gray; font-weight: lighter;',
        'color: #4CAF50; font-weight: bold;', // Green for states
        'color: gray; font-weight: lighter;',
      )
      console.log('State Value:', snapshot.value)
      console.log('Context:', snapshot.context)
      if (snapshot.children && typeof snapshot.children === 'object' && Object.keys(snapshot.children).length > 0) {
        const childIds = Object.keys(snapshot.children)
        console.log('Children:', childIds)
      }
      // The 'event' property might not exist on all snapshot types from inspection events.
      // It's more reliably on the State object itself.
      // For inspection, the event that *led* to this state might be less direct.
      // We can log snapshot.event if it exists.
      if ('event' in snapshot) {
        console.log('Event that led to this snapshot:', snapshot.event)
      }
      console.groupEnd()
    }
    // Add more specific logging for other types like '@xstate.actor' or '@xstate.transition' if needed
  },
  error: (err: unknown) => {
    console.error('%cINSPECTOR ERROR', 'color: red; font-weight: bold;', err)
  },
  complete: () => {
    // This is called when the root machine (the one being inspected) completes.
    // For a long-running appMachine, this might not be called until the app closes.
    console.log('%cMACHINE COMPLETE', 'color: orangered; font-weight: bold;', '(Inspector observed completion)')
  },
}
