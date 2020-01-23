const inputName = document.querySelector('#input-name');
const inputRating = document.querySelector('#input-rating');
const submit = document.querySelector('#submit');
const list = document.querySelector('ion-list');
const alertCtrl = document.querySelector('ion-alert-controller');


submit.addEventListener('click', () => {
    const enteredName = inputName.value;
    const enteredRating = inputRating.value;

    if (enteredName.trim().length <= 0 || ![1, 2, 3, 4, 5].includes(parseInt(enteredRating))) {
        console.log('about to create');
        alertCtrl.create({
            header: 'Invalid Input',
            subHeader: 'Please enter a valid class name and rating',
            message: 'Another message',
            buttons: ['Ok']
        }).then(alertElement => {
            alertElement.present();
        });
        return;
    }

    const newItem = document.createElement('ion-item');
    newItem.innerHTML = `<strong>${enteredCourseName}:</strong>&nbsp;${enteredCourseRating}/5`;

    list.append(newItem);
    clear();
});

const clear = () => {
    inputName.value = '';
    inputRating.value = '';
}