# Assets Directory

## Required Files

### 3D Models
- `car.glb` - 3D model of a vehicle (preferably Dodge Hellcat) for the main animation
  - Should be optimized for web (< 5MB)
  - Include separate parts/materials for: body, wheels, windows, lights
  - Use standard materials that work well with Three.js

### Images
- `logo.svg` - ProTint Louisville logo for navigation
- `favicon.ico` - Site favicon

## Current Status
- ✅ Basic wireframe car model (temporary)
- ⏳ Need actual car.glb model
- ⏳ Need logo.svg

## Notes
- The CarViewer component currently uses basic Three.js geometry as a placeholder
- Once car.glb is added, update the CarViewer component to load the actual model
- Ensure the 3D model has proper naming for different parts to enable step-by-step animation 