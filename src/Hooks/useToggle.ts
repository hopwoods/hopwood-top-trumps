import { useCallback, useState } from 'react'
export function useToggle(initialValue: boolean = false)  {
    const [toggleValue, setValue] = useState(initialValue)

    const toggle = useCallback(() => {
        setValue(prev => !prev)
    }, [])

    function setTrue() {
        setValue(true)
    }

    function setFalse() {
        setValue(false)
    }

    return {toggleValue, toggle, setTrue, setFalse}
}