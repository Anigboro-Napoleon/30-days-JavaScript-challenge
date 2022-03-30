const panels = document.querySelectorAll('.panel');

function toggleOpen() {
  this.classList.toggle('open');
}

function toggleOpenActive(e) {
  // console.log(e.propertyName); Using this console.log will let us know the event that transitionend is carrying and when we checked that, we saw that there were two events which are font size and flex grow. Having this information was what we used in our if statement where we said if the event includes flex as in the flex grow, then we should toggle the new class.
  if (e.propertyName.includes('flex')) {
    this.classList.toggle('open-active');
  }
}

panels.forEach(panel => panel.addEventListener('click', toggleOpen));
panels.forEach(panel => panel.addEventListener('transitionend', toggleOpenActive));