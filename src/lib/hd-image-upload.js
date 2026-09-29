// High Resolution Image Upload Addon for SaturnMod

(function () {
  'use strict';

  // Default max resolution limits
  const RESOLUTION_PRESETS = {
    STANDARD: { width: 960, height: 720 },
    FHD: { width: 1920, height: 1080 }, // Full HD (1080p)
    FOUR_K: { width: 3840, height: 2160 } // 4K Ultra HD
  };

  class HDImageUploadAddon {
    constructor() {
      this.currentPreset = 'FHD'; // Default to FHD
    }

    // Set target resolution dynamically
    setResolution(mode) {
      if (RESOLUTION_PRESETS[mode]) {
        this.currentPreset = mode;
        this.applyPatch();
      }
    }

    // Override internal Scratch Bitmap/Image importer max dimensions
    applyPatch() {
      const preset = RESOLUTION_PRESETS[this.currentPreset];

      if (window.Scratch && window.Scratch.PaperCanvas) {
        // Intercept costume canvas scaling
        window.Scratch.PaperCanvas.MAX_BITMAP_WIDTH = preset.width;
        window.Scratch.PaperCanvas.MAX_BITMAP_HEIGHT = preset.height;
      }

      // Hook into Scratch GUI Asset Loader if present
      if (window.SaturnModConfig) {
        window.SaturnModConfig.maxImageWidth = preset.width;
        window.SaturnModConfig.maxImageHeight = preset.height;
      }

      console.log(`[SaturnMod] Image Upload limit set to ${this.currentPreset} (${preset.width}x${preset.height})`);
    }
  }

  // Register globally so UI settings toggles can trigger it
  window.SaturnModHDImages = new HDImageUploadAddon();
  window.SaturnModHDImages.applyPatch();
})();
