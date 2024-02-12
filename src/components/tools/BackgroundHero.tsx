interface PropsStyle {
    heigth: string;
}

const BackgroundHero = (PropsStyle: PropsStyle) => {
    const { heigth } = PropsStyle;

    return (
        <div
            className={`
                bg-[url(https://wallpapercave.com/wp/wp12063315.jpg)]
                bg-[center_top_-4rem]
                bg-cover
                absolute
                w-full
                h-[${heigth}]
                top-0
                z-[-1]
                brightness-75
            `}
        />
    )
}

export default BackgroundHero;