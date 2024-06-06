
type portionProps = {
    isActive: boolean
    size: string
    sizeHandler: (str: string) => void
}

export const PortionControl: React.FC<portionProps> = ({isActive, size, sizeHandler}) => {

    if(!isActive) {
        return (
            <>
                <HalfPortion active={false}/>
                <FullPortion active={false}/>
            </>
        )
    } else {
        return (
            <>
                <HalfPortion active={isActive && size === 'half'} sizeHandler={() => sizeHandler('half')}/>
                <FullPortion active={isActive && size === 'full'} sizeHandler={() => sizeHandler('full')}/>
            </>
        )
    }
}

type miniPortionProps = {
    active: boolean
    sizeHandler?: () => void;
}

export const HalfPortion: React.FC<miniPortionProps> = ({active, sizeHandler}) => {
    return (
        <div className="halfportion" style={{border: active ? `2px solid black` : `2px solid transparent`}} onClick={sizeHandler ? () => sizeHandler() : undefined}>
            <div className="top"></div>
            <div className="bottom">
                <div className="full-row"></div>
                <div className="half-row"></div>
                <div className="mix-row">
                    <div className="split-col">
                        <div></div>
                        <div></div>
                    </div>
                    <div className="circle-col"></div>
                </div>
            </div>
        </div>
    )
}

export const FullPortion: React.FC<miniPortionProps> = ({active, sizeHandler}) => {
    return (
        <div className="fullportion" style={{border: active ? `2px solid black` : `2px solid transparent`}}  onClick={sizeHandler ? () => sizeHandler() : undefined}>
            <div className="fullportion-container">
                <div className="funny">
                    <div className="full-row"></div>
                    <div className="half-row"></div>
                </div>
            </div>
        </div>
    )
}