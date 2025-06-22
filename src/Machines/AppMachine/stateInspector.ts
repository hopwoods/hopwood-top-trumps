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
      const snapshot = inspectionEvent.snapshot as any
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Bypassing complex type issue for dev tool
      const actorIdForSnapshot: string = (inspectionEvent.actorRef as any)?.id ?? 'unknown_actor'

      // Log actor done/error events specifically
      if (snapshot.event?.type?.startsWith('xstate.done.actor')) {
        console.groupCollapsed(
          `%cACTOR DONE %c${actorIdForSnapshot}`,
          'color: gray; font-weight: lighter;',
          'color: #2196F3; font-weight: bold;', // Blue for actor done
        )
        console.log('Actor ID:', actorIdForSnapshot)
        console.log('Output:', snapshot.output)
        console.log('Originating Event:', snapshot.event)
        console.groupEnd()
      } else if (snapshot.event?.type?.startsWith('xstate.error.actor')) {
        console.groupCollapsed(
          `%cACTOR ERROR %c${actorIdForSnapshot}`,
          'color: gray; font-weight: lighter;',
          'color: #F44336; font-weight: bold;', // Red for actor error
        )
        console.log('Actor ID:', actorIdForSnapshot)
        console.log('Error Data:', snapshot.error) // Or snapshot.data depending on XState version/event
        console.log('Originating Event:', snapshot.event)
        console.groupEnd()
      } else {
        // Standard snapshot logging
        const stateValueString = typeof snapshot.value === 'undefined' ? 'undefined' : JSON.stringify(snapshot.value)
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
        if ('event' in snapshot) {
          console.log('Event that led to this snapshot:', snapshot.event)
        }
        console.groupEnd()
      }
    } else if (inspectionEvent.type === '@xstate.actor') {
      // Type assertion to help TypeScript understand the specific event type
      const actorStartEvent = inspectionEvent as InspectionEvent & { type: '@xstate.actor'; actorRef: { id: string; input?: unknown }; sourceRef?: { sessionId?: string } };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Bypassing complex type issue for dev tool
      const actorRef = actorStartEvent.actorRef as any;
      const actorId: string = actorRef?.id ?? 'unknown_actor'
      const input = actorRef?.input

      console.groupCollapsed(
        `%cACTOR START %c${actorId}`,
        'color: gray; font-weight: lighter;',
        'color: #FF9800; font-weight: bold;', // Orange for actor start
      )
      console.log('Actor ID:', actorId)
      if (input !== undefined) {
        console.log('Input:', input)
      }
      if (actorStartEvent.sourceRef) {
        console.log('Source Session ID:', actorStartEvent.sourceRef.sessionId)
      }
      console.groupEnd()
    }
    // Add more specific logging for other types like '@xstate.transition' if needed
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
