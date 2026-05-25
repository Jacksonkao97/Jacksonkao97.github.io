const lazyLoad = async (importFn, pageName) => {
  try {
    const { default: Component, loader } = await importFn();
    return { Component, loader };
  } catch (error) {
    console.error(`Failed to load ${pageName}:`, error);

    const isChunkError =
      error.name === "ChunkLoadError" ||
      error.message?.includes("Failed to fetch") ||
      error.message?.includes("Importing a module script failed");

    if (isChunkError) {
      const reloadKey = `reload-${pageName}`;
      const hasReloaded = sessionStorage.getItem(reloadKey);
      if (!hasReloaded) {
        sessionStorage.setItem(reloadKey, "true");
        console.log(`Reloading due to chunk error for ${pageName}`);
        window.location.reload();
        return {};
      }
    }

    throw error;
  }
};

export default lazyLoad;
