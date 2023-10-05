import throttle from 'lodash.throttle';
const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');

function saveFormData() {
  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function fillFormFields() {
  const savedData = localStorage.getItem('feedback-form-state');

  if (savedData) {
    const formData = JSON.parse(savedData);
    emailInput.value = formData.email;
    messageTextarea.value = formData.message;
  }
}

const throttledSaveFormData = throttle(saveFormData, 100);
emailInput.addEventListener('input', throttledSaveFormData);
messageTextarea.addEventListener('input', throttledSaveFormData);

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const savedData = localStorage.getItem('feedback-form-state');

  if (savedData) {
    const formData = JSON.parse(savedData);

    localStorage.removeItem('feedback-form-state');
    emailInput.value = '';
    messageTextarea.value = '';

    console.log('Form Data Submitted:', formData);
  }
});

fillFormFields();
