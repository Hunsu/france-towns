export const getDataProps = (props: { [x: string]: string }) => {
    const newProps: { [x: string]: string } = {}

    Object.keys(props).forEach((key) => {
        if (key.startsWith('data-')) newProps[key] = props[key]
    })

    return newProps
}

