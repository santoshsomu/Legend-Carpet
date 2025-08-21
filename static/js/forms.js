document.addEventListener('DOMContentLoaded', () => {
    const multiStepForm = document.querySelector('.multi-step-form');

    if (multiStepForm) {
        const steps = multiStepForm.querySelectorAll('.form-step');
        const progressSteps = document.querySelectorAll('.progress-bar-step');
        const nextButtons = multiStepForm.querySelectorAll('.next-btn');
        const prevButtons = multiStepForm.querySelectorAll('.prev-btn');
        let currentStep = 0;

        const updateFormStep = () => {
            steps.forEach((step, index) => {
                step.classList.toggle('active', index === currentStep);
            });
            progressSteps.forEach((step, index) => {
                step.classList.toggle('active', index <= currentStep);
            });
        };

        const validateStep = (stepIndex) => {
            const currentStepFields = steps[stepIndex].querySelectorAll('[required]');
            let isValid = true;
            currentStepFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                } else {
                    field.classList.remove('is-invalid');
                }
            });
            return isValid;
        };

        nextButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (validateStep(currentStep) && currentStep < steps.length - 1) {
                    currentStep++;
                    updateFormStep();
                }
            });
        });

        prevButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (currentStep > 0) {
                    currentStep--;
                    updateFormStep();
                }
            });
        });

        multiStepForm.addEventListener('submit', (e) => {
            if (!validateStep(currentStep)) {
                e.preventDefault();
            }
        });
    }
});
