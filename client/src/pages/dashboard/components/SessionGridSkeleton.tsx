const SessionGridSkeleton = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
                <div
                    key={i}
                    className="bg-zinc-800/40 animate-pulse h-40 rounded-md"
                ></div>
            ))}
        </div>
    );
};
export default SessionGridSkeleton;
