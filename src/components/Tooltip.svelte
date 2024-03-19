<script>
  export let text;
</script>

<div class="tooltip">
    <slot />
  <span class="tooltiptext">{text}</span>
</div>

<style>

.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black; /* Optional: Add a dotted border bottom */
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
  top: 100%; /* Position the arrow at the bottom of the tooltip */
  left: 50%;
  margin-left: -5px; /* Adjust as needed */
  border-width: 5px;
  border-style: solid;
  border-color: whitesmoke transparent transparent transparent;
}



</style>