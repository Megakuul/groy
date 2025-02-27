<script>
  const MIN_ZOOM = 0.4
  const MAX_ZOOM = 3
  const SCROLL_SPEED = 0.06;
  const CAMERA_BORDER = 40
  const ARROW_KEY_SPEED = 10;

  const TILE_SIZE = 20;

  /** @type {HTMLElement} */
  let root;

  /** @type {number} */
  let columns = 170;
  /** @type {number} */
  let rows = 100;

  /** @type {number} */
  let zoom = 1;

  const handleScroll = (/** @type {WheelEvent} */ event) => {
    if (event.deltaY > 0) {
      zoom = Math.max(zoom-(SCROLL_SPEED*zoom), MIN_ZOOM)
    } else if (event.deltaY < 0) {
      zoom = Math.min(zoom+(SCROLL_SPEED*zoom), MAX_ZOOM)
    }

    cameraX = clampCameraX(cameraX)
    cameraY = clampCameraY(cameraY)
  }

  /** @type {number} */
  let cameraX = 0
  /** @type {number} */
  let cameraY = 0
  /** @type {number} */
  let dragX = 0
  /** @type {number} */
  let dragY = 0
  /** @type {number} */
  let startPosX = 0;
  /** @type {number} */
  let startPosY = 0;

  /** @type {boolean} */
  let mouseDown = false

  const handleMouseDown = (/** @type {MouseEvent} */ event) => {
    if (event.button === 0) {
      mouseDown = true
      dragX = event.clientX
      dragY = event.clientY
      startPosX = cameraX
      startPosY = cameraY
    }
  }

  const handleMouseUp = (/** @type {MouseEvent} */ event) => {
    if (event.button === 0) {
      mouseDown = false
    }
  }

  const handleMouseDrag = (/** @type {MouseEvent} */ event) => {
    if (event.buttons === 1 && mouseDown) {
      cameraX = clampCameraX(startPosX + (dragX - event.clientX))
      cameraY = clampCameraY(startPosY + (dragY - event.clientY))
    }
  }

  /** @param {number} camera @returns {number} */
  const clampCameraX = (camera) => {
    let cameraMinX = -(columns * TILE_SIZE / 2 - root.clientWidth/2/zoom + CAMERA_BORDER)
    let cameraMaxX = columns * TILE_SIZE / 2 - root.clientWidth/2/zoom + CAMERA_BORDER

    return Math.min(
      Math.max(camera, Math.min(cameraMinX, 0)), 
      Math.max(cameraMaxX, 0)
    )
  }

  /** @param {number} camera @returns {number} */
  const clampCameraY = (camera) => {
    let cameraMinY = -(rows * TILE_SIZE / 2 - root.clientHeight/2/zoom + CAMERA_BORDER)
    let cameraMaxY = rows * TILE_SIZE / 2 - root.clientHeight/2/zoom + CAMERA_BORDER
    
    return Math.min(
      Math.max(camera, Math.min(cameraMinY, 0)), 
      Math.max(cameraMaxY, 0)
    )
  }


  /** @param {number} len */
  const createList = (len) => {
    /** @type {number[]} */
    let array = [];
    for (let i = 0; i < len; i++) {
      array.push(i);
    }
    return array;
  }
</script>

<div role="button" aria-label="Click to interact" tabindex="0"
  bind:this={root}
  on:mousedown={handleMouseDown}
  on:mouseup={handleMouseUp}
  on:mousemove={handleMouseDrag}
  on:wheel={handleScroll} 
  class="relative w-full h-screen bg-slate-700 overflow-hidden">
  <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
    <div class="bg-grid relative bg-slate-600"
      style="scale: {zoom}; translate: {-cameraX}px {-cameraY}px; width: {columns*TILE_SIZE}px; height: {rows*TILE_SIZE}px; background-size: {TILE_SIZE}px {TILE_SIZE}px">
      {#each createList(1000) as i}
        <div style="width: {TILE_SIZE -2}px; height: {TILE_SIZE -2}px; top: {TILE_SIZE * i}px; left: {TILE_SIZE * i}px;" class="absolute bg-orange-600 z-50"
          on:click={() => console.log(i)}
        >
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .bg-grid {
    transform-origin: center;
    background-image: 
      linear-gradient(to right, rgba(255, 255, 255, 0.3) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 1px, transparent 1px);
  }
</style>