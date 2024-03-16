export const PageContainer = ({ children }) => {
    return (
        <div className="font-sans">
            <div className="p-4 md:p-6 lg:p-8">
                <div
                    className=" border-round surface-card"
                    style={{ minHeight: "20rem" }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}

export const ElementContainer = ({ children }) => {
    return (
        <div className=" p-1 m-1">
            {children}
        </div>
    );
}

export const FrameContainer = ({ children }) => {
    return (
        <div
            className=" border-round surface-card border-2 border-solid border-100"
        >
            <div className="p-2 md:p-2 lg:p-2">
                {children}
            </div>
        </div>
    );
}