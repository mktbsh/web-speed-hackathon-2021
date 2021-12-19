export const PostsLoader = () => (
  <article className="px-1 sm:px-4">
    <div className="animate-pulse flex pb-4 pt-2 px-2 border-b border-gray-300 sm:px-4">
      <div className="flex-grow-0 flex-shrink-0 pr-2 sm:pr-4">
        <div className="block w-12 h-12 bg-gray-300 border border-gray-300 rounded-full hover:opacity-75 overflow-hidden sm:w-16 sm:h-16" />
      </div>
      <div className="flex-1 space-y-6 py-1">
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-3.5 bg-gray-300 rounded col-span-1"></div>
            <div className="h-3.5 bg-gray-300 rounded col-span-2"></div>
          </div>
          <div className="h-10 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  </article>
);
