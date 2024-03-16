

export const Divider = ({ children }) => {
    return (
        <div className="w-2">
            <div className="flex relative align-items-center justify-content-center mx-3 py-3 min-h-full">
                <div className="border-left-1 surface-border top-0 left-50 absolute h-full"></div>
                <div className="py-2 z-1 surface-0">
                    {children}
                </div>
            </div>
        </div>
    );
}