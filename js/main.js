const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const journey = document.querySelector('.journey');
const scenes = [...document.querySelectorAll('.scene')];
const copies = [...document.querySelectorAll('.stage-copy')];
const progressBar = document.querySelector('.journey-progress span');
const stageCount = document.querySelector('#stage-count');
const parcels = [...document.querySelectorAll('.parcel')];
let activeStage = -1;

function updateJourney() {
  const rect = journey.getBoundingClientRect();
  const distance = journey.offsetHeight - window.innerHeight;
  const progress = Math.min(1, Math.max(0, -rect.top / distance));
  const stage = Math.min(3, Math.floor(progress * 4));

  progressBar.style.width = `${progress * 100}%`;

  const moveX = progress < .34 ? progress * 125 : progress < .7 ? 42 : 82;
  const lift = Math.sin(progress * Math.PI * 3) * 18;
  parcels.forEach((parcel, index) => {
    parcel.style.transform = `translate(${moveX}vw, ${lift + index * -4}px) rotate(${progress * 160 + index * 18}deg) scale(${stage === 2 ? .45 : stage === 3 ? .8 : 1})`;
    parcel.style.opacity = stage === 2 ? '.18' : stage === 3 ? '.9' : '1';
  });

  if (stage !== activeStage) {
    activeStage = stage;
    scenes.forEach((scene, index) => scene.classList.toggle('active', index === stage));
    copies.forEach((copy, index) => copy.classList.toggle('active', index === stage));
    stageCount.textContent = `0${stage + 1} / 04`;
  }
}

window.addEventListener('scroll', updateJourney, { passive: true });
window.addEventListener('resize', updateJourney);
updateJourney();
document.querySelector('#year').textContent = new Date().getFullYear();
