document.addEventListener('DOMContentLoaded', () => {
    // Get the multi-step form
    const multiStepForm = document.querySelector('.multi-step-form');

    if (multiStepForm) {
        const steps = multiStepForm.querySelectorAll('.form-step');
        const progressSteps = document.querySelectorAll('.progress-bar-step');
        const nextButtons = multiStepForm.querySelectorAll('.next-btn');
        const prevButtons = multiStepForm.querySelectorAll('.prev-btn');
        let currentStep = 0;

        // Initialize first step
        updateFormStep();

        // Handle next button clicks
        nextButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent form submission
                if (validateStep(currentStep) && currentStep < steps.length - 1) {
                    currentStep++;
                    updateFormStep();
                }
            });
        });

        // Handle previous button clicks
        prevButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent form submission
                if (currentStep > 0) {
                    currentStep--;
                    updateFormStep();
                }
            });
        });

        // Update form step display
        function updateFormStep() {
            steps.forEach((step, index) => {
                step.classList.remove('active');
                if (index === currentStep) {
                    step.classList.add('active');
                }
            });

            // Update progress bar
            progressSteps.forEach((step, index) => {
                if (index <= currentStep) {
                    step.classList.add('active');
                } else {
                    step.classList.remove('active');
                }
            });

            // Update buttons
            if (currentStep === 0) {
                document.querySelector('.prev-btn')?.classList.add('hidden');
            } else {
                document.querySelector('.prev-btn')?.classList.remove('hidden');
            }

            if (currentStep === steps.length - 1) {
                document.querySelector('.next-btn')?.classList.add('hidden');
                document.querySelector('button[type="submit"]')?.classList.remove('hidden');
            } else {
                document.querySelector('.next-btn')?.classList.remove('hidden');
                document.querySelector('button[type="submit"]')?.classList.add('hidden');
            }
        }

        // Validate current step
        function validateStep(stepIndex) {
            const currentStepElement = steps[stepIndex];
            const requiredFields = currentStepElement.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                    // Add error message
                    const errorDiv = field.parentElement.querySelector('.error-message');
                    if (!errorDiv) {
                        const div = document.createElement('div');
                        div.className = 'error-message';
                        div.style.color = 'red';
                        div.style.fontSize = '0.8rem';
                        div.style.marginTop = '0.25rem';
                        div.textContent = 'This field is required';
                        field.parentElement.appendChild(div);
                    }
                } else {
                    field.classList.remove('is-invalid');
                    // Remove error message if exists
                    const errorDiv = field.parentElement.querySelector('.error-message');
                    if (errorDiv) {
                        errorDiv.remove();
                    }
                }
            });

            return isValid;
        }

        // Handle form submission
        multiStepForm.addEventListener('submit', (e) => {
            if (!validateStep(currentStep)) {
                e.preventDefault();
            }
        });
    }

    // File Upload Handler
    document.querySelectorAll('.file-upload-input').forEach(input => {
        input.addEventListener('change', function(e) {
            const filePreview = this.parentElement.querySelector('.file-preview');
            filePreview.innerHTML = '';
            
            Array.from(this.files).forEach(file => {
                if (file.size > 10 * 1024 * 1024) { // 10MB limit
                    alert('File size should not exceed 10MB');
                    return;
                }

                const reader = new FileReader();
                const div = document.createElement('div');
                div.className = 'file-preview-item';
                
                reader.onload = function(e) {
                    if (file.type.startsWith('image/')) {
                        div.innerHTML = `
                            <img src="${e.target.result}" alt="File preview">
                            <button class="remove-file" type="button">&times;</button>
                        `;
                    } else if (file.type.startsWith('video/')) {
                        div.innerHTML = `
                            <i class="fas fa-video"></i>
                            <span>${file.name}</span>
                            <button class="remove-file" type="button">&times;</button>
                        `;
                    }
                };
                
                reader.readAsDataURL(file);
                filePreview.appendChild(div);
            });
        });
    });

    // Handle drag and drop
    document.querySelectorAll('.file-upload-container').forEach(container => {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            container.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        container.addEventListener('dragenter', function() {
            this.classList.add('drag-active');
        });

        container.addEventListener('dragleave', function() {
            this.classList.remove('drag-active');
        });

        container.addEventListener('drop', function(e) {
            this.classList.remove('drag-active');
            const input = this.querySelector('.file-upload-input');
            input.files = e.dataTransfer.files;
            input.dispatchEvent(new Event('change'));
        });
    });

    // Initialize all file upload inputs
    const fileInputs = document.querySelectorAll('.file-upload-input');
    
    fileInputs.forEach(input => {
        const container = input.closest('.file-upload-container');
        const preview = container.querySelector('.file-preview');
        // create or reuse a status line element
        let statusEl = container.querySelector('.file-upload-status');
        if (!statusEl) {
            statusEl = document.createElement('div');
            statusEl.className = 'file-upload-status';
            statusEl.style.marginTop = '0.5rem';
            statusEl.style.fontSize = '0.9rem';
            container.appendChild(statusEl);
        }

        const maxSize = 10 * 1024 * 1024; // 10MB
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/quicktime'];
        
        input.addEventListener('change', function (e) {
            preview.innerHTML = ''; // Clear previous previews

            // Build new FileList containing only valid files
            const dt = new DataTransfer();
            Array.from(this.files).forEach(file => {
                const fileSize = file.size;
                const fileType = file.type;
                const previewItem = document.createElement('div');
                previewItem.className = 'file-preview-item';

                // invalid: too large
                if (fileSize > maxSize) {
                    previewItem.innerHTML = `
                        <div class="file-error">
                            <i class="fas fa-exclamation-circle"></i>
                            <span>${file.name} — ${(fileSize / (1024 * 1024)).toFixed(1)}MB (too large)</span>
                        </div>`;
                    preview.appendChild(previewItem);
                    return; // do not add to dt
                }

                // invalid: unsupported type
                if (!allowedTypes.includes(fileType)) {
                    previewItem.innerHTML = `
                        <div class="file-error">
                            <i class="fas fa-exclamation-circle"></i>
                            <span>${file.name} — Unsupported type</span>
                        </div>`;
                    preview.appendChild(previewItem);
                    return; // do not add to dt
                }

                // valid file
                dt.items.add(file);

                // render preview for valid files
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function (evt) {
                        previewItem.innerHTML = `
                            <div class="file-success">
                                <img src="${evt.target.result}" alt="${file.name}" style="max-height:80px; max-width:120px; object-fit:cover; border-radius:4px;">
                                <span>${file.name}</span>
                                <button type="button" class="remove-file" aria-label="Remove file">&times;</button>
                            </div>`;
                        bindRemove(previewItem, input, file);
                    };
                    reader.readAsDataURL(file);
                } else { // video or other allowed type
                    previewItem.innerHTML = `
                        <div class="file-success">
                            <i class="fas fa-video" style="font-size:1.25rem;"></i>
                            <span>${file.name}</span>
                            <button type="button" class="remove-file" aria-label="Remove file">&times;</button>
                        </div>`;
                    bindRemove(previewItem, input, file);
                }

                preview.appendChild(previewItem);
            });

            // replace input.files with only the valid files
            input.files = dt.files;

            // update status line
            const count = input.files.length;
            if (count > 0) {
                statusEl.textContent = `${count} file(s) ready to upload`;
                statusEl.style.color = '';
            } else {
                statusEl.textContent = `No valid files selected`;
                statusEl.style.color = 'var(--danger)';
            }
        });

        // helper to bind remove button and update FileList
        function bindRemove(previewItem, inputEl, fileToRemove) {
            // delegated: wait until button exists
            const btn = previewItem.querySelector('.remove-file');
            if (!btn) return;
            btn.addEventListener('click', () => {
                // remove preview DOM
                previewItem.remove();
                // rebuild FileList without the removed file
                const dt2 = new DataTransfer();
                Array.from(inputEl.files).forEach(f => {
                    // compare by name + size to be safe
                    if (!(f.name === fileToRemove.name && f.size === fileToRemove.size)) {
                        dt2.items.add(f);
                    }
                });
                inputEl.files = dt2.files;
                // update status
                const newCount = inputEl.files.length;
                statusEl.textContent = newCount > 0 ? `${newCount} file(s) ready to upload` : 'No valid files selected';
            });
        }

        // Drag and drop visual feedback using CSS variable values
        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary') || '#0f172a';
        const mutedColor = getComputedStyle(document.documentElement).getPropertyValue('--muted') || '#64748b';

        container.addEventListener('dragenter', (e) => {
            e.preventDefault();
            container.classList.add('drag-active');
            container.style.borderColor = primaryColor.trim();
            // keep background transparent
            container.style.background = 'transparent';
        });
        container.addEventListener('dragleave', (e) => {
            e.preventDefault();
            container.classList.remove('drag-active');
            container.style.borderColor = mutedColor.trim();
            container.style.background = 'transparent';
        });
        container.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        container.addEventListener('drop', (e) => {
            e.preventDefault();
            container.classList.remove('drag-active');
            const inputEl = container.querySelector('.file-upload-input');
            if (!inputEl) return;
            // set files from drop and trigger change
            inputEl.files = e.dataTransfer.files;
            inputEl.dispatchEvent(new Event('change'));
        });
    });
});
