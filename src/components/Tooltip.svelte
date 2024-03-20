<script>
  export let text;
  export let isPointingDown = true;
</script>

{#if isPointingDown}
  <div class="tooltip">
      <slot />
    <span class="tooltiptext down">{text}</span>
  </div>
  {:else}
  <div class="tooltip tooltipUp">
      <slot />
    <span class="tooltiptext tooltiptextUp">{text}</span>
  </div>
{/if}

<style>

.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: whitesmoke;
  opacity: 0.85;
  color: black;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  top: -40px; /* Position the tooltip above the element */
  left: 50%;
  transform: translateX(-50%);
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  margin-left: -5px; /* Adjust as needed */
  border-width: 5px;
  border-style: solid;
  border-color: whitesmoke transparent transparent transparent;
  left: 50%;

}

.down::after {
  top: 100%; /* Position the arrow at the bottom of the tooltip */
}

.tooltipUp .tooltiptextUp {
  top: 50px; /* Position the tooltip above the element */
}

.tooltipUp .tooltiptextUp::after {
    bottom: 100%;
    transform-origin: center; /* Set the transform origin to the center */
  transform: rotate(180deg); /* Rotate the arrow 180 degrees */

}

</style>