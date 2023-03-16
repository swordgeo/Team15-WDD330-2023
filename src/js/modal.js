const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')
const thanks = document.getElementById('thanksAlert')
// const newsLetterAlert = document.getElementById('thanksAlert')


openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

thanks.addEventListener('click', () => {
  const modals = document.querySelectorAll('.newsLetterModal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

// newsLetterAlert.addEventListener('click', () => {
//   alert("Hello");
// })

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.newsLetterModal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.newsLetterModal')
    closeModal(modal)
  })
})

 export function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

export function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}