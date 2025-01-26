const template = /* html */ `
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>SuperSplat Viewer</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
        {{style}}
        <script type="importmap">
            {
                "imports": {
                    "playcanvas": "https://cdn.jsdelivr.net/npm/playcanvas@2.3.3/build/playcanvas.mjs",
                    "viewerSettings": "{{settingsURL}}"
                }
            }
        </script>
        <script type="module" src="https://cdn.jsdelivr.net/npm/@playcanvas/web-components@0.1.11/dist/pwc.mjs"></script>
    </head>
    <body>
        <pc-app antialias="false" depth="false" high-resolution="true" stencil="false">
            <pc-asset id="camera-controls" src="https://cdn.jsdelivr.net/npm/playcanvas@2.3.1/scripts/esm/camera-controls.mjs" preload></pc-asset>
            <pc-asset id="xr-controllers" src="https://cdn.jsdelivr.net/npm/playcanvas@2.3.1/scripts/esm/xr-controllers.mjs" preload></pc-asset>
            <pc-asset id="xr-navigation" src="https://cdn.jsdelivr.net/npm/playcanvas@2.3.1/scripts/esm/xr-navigation.mjs" preload></pc-asset>
            <pc-asset id="ply" type="gsplat" src="{{contentURL}}"></pc-asset>
            <pc-scene>
                <!-- Camera (with XR support) -->
                <pc-entity name="camera root">
                    <pc-entity name="camera">
                        <pc-camera nearClip="0.01" farClip="1000" horizontalFov="true" tonemap="none"></pc-camera>
                        <pc-scripts>
                            <pc-script name="cameraControls"></pc-script>
                        </pc-scripts>
                    </pc-entity>
                    <pc-scripts>
                        <pc-script name="xrControllers"></pc-script>
                        <pc-script name="xrNavigation"></pc-script>
                    </pc-scripts>
                </pc-entity>
                <!-- Light (for XR controllers) -->
                <pc-entity name="light" rotation="35 45 0">
                    <pc-light color="white" intensity="1.5"></pc-light>
                </pc-entity>
                <!-- Splat -->
                <pc-entity name="splat" rotation="0 0 180">
                    <pc-splat asset="ply"></pc-splat>
                </pc-entity>
            </pc-scene>
        </pc-app>

        <!-- Loading Indicator -->
        <div id="loadingIndicator">Loading...</div>

        <!-- Info Panel -->
        <div id="infoPanel" class="hidden" onclick="document.getElementById('infoPanel').classList.add('hidden')">
            <div id="infoPanelContent" onclick="event.stopPropagation()">
                <h3>Controls</h3>
                <div class="control-item">
                    <span class="control-action">Orbit</span>
                    <span class="control-key">Left Mouse Button</span>
                </div>
                <div class="control-item">
                    <span class="control-action">Pan</span>
                    <span class="control-key">Middle Mouse Button</span>
                </div>
                <div class="control-item">
                    <span class="control-action">Look around</span>
                    <span class="control-key">Right Mouse Button</span>
                </div>
                <div class="control-item">
                    <span class="control-action">Zoom</span>
                    <span class="control-key">Mouse Wheel</span>
                </div>
                <div class="control-item">
                    <span class="control-action">Fly</span>
                    <span class="control-key">W,S,A,D</span>
                </div>
                <div class="control-item">
                    <span class="control-action">Fly faster</span>
                    <span class="control-key">Shift</span>
                </div>
                <div class="control-item">
                    <span class="control-action">Fly slower</span>
                    <span class="control-key">Ctrl</span>
                </div>
                <div class="control-item">
                    <span class="control-action">Frame Scene</span>
                    <span class="control-key">F</span>
                </div>
                <div class="control-item">
                    <span class="control-action">Reset Camera</span>
                    <span class="control-key">R</span>
                </div>
            </div>
        </div>

        <!-- Buttons Panel -->
        <div id="buttonContainer">
            <button id="arMode" class="button hidden">
                <svg class="buttonSvg" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M440-181 240-296q-19-11-29.5-29T200-365v-230q0-22 10.5-40t29.5-29l200-115q19-11 40-11t40 11l200 115q19 11 29.5 29t10.5 40v230q0 22-10.5 40T720-296L520-181q-19 11-40 11t-40-11Zm0-92v-184l-160-93v185l160 92Zm80 0 160-92v-185l-160 93v184ZM80-680v-120q0-33 23.5-56.5T160-880h120v80H160v120H80ZM280-80H160q-33 0-56.5-23.5T80-160v-120h80v120h120v80Zm400 0v-80h120v-120h80v120q0 33-23.5 56.5T800-80H680Zm120-600v-120H680v-80h120q33 0 56.5 23.5T880-800v120h-80ZM480-526l158-93-158-91-158 91 158 93Zm0 45Zm0-45Zm40 69Zm-80 0Z"/></svg>
            </button>
            <button id="vrMode" class="button hidden">
                <svg class="buttonSvg" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M300-240q-66 0-113-47t-47-113v-163q0-51 32-89.5t82-47.5q57-11 113-15.5t113-4.5q57 0 113.5 4.5T706-700q50 10 82 48t32 89v163q0 66-47 113t-113 47h-40q-13 0-26-1.5t-25-6.5l-64-22q-12-5-25-5t-25 5l-64 22q-12 5-25 6.5t-26 1.5h-40Zm0-80h40q7 0 13.5-1t12.5-3q29-9 56.5-19t57.5-10q30 0 58 9.5t56 19.5q6 2 12.5 3t13.5 1h40q33 0 56.5-23.5T740-400v-163q0-22-14-38t-35-21q-52-11-104.5-14.5T480-640q-54 0-106 4t-105 14q-21 4-35 20.5T220-563v163q0 33 23.5 56.5T300-320ZM40-400v-160h60v160H40Zm820 0v-160h60v160h-60Zm-380-80Z"/></svg>
            </button>
            <button id="enterFullscreen" class="button hidden">
                <svg class="buttonSvg" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z"/></svg>
            </button>
            <button id="exitFullscreen" class="button hidden">
                <svg class="buttonSvg" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M240-120v-120H120v-80h200v200h-80Zm400 0v-200h200v80H720v120h-80ZM120-640v-80h120v-120h80v200H120Zm520 0v-200h80v120h120v80H640Z"/></svg>
            </button>
            <button id="info" class="button">
                <svg class="buttonSvg" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
            </button>
        </div>

        {{script}}
    </body>
</html>
`;

export { template };