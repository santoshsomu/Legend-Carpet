import os
import logging  # Add this import
from flask import Flask, render_template, abort, request, redirect, url_for, flash
from flask_mail import Mail, Message
from werkzeug.utils import secure_filename

app = Flask(__name__)

# --- Production-ready Configuration ---
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'a-very-secret-key-that-should-be-changed')

# Email Configuration with environment variables for production
app.config['MAIL_SERVER'] = os.environ.get('MAIL_SERVER', 'smtp.gmail.com')
app.config['MAIL_PORT'] = int(os.environ.get('MAIL_PORT', 587))
app.config['MAIL_USE_TLS'] = os.environ.get('MAIL_USE_TLS', 'True').lower() == 'true'
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME', 'akshaysomu@gmail.com')
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD', 'sjsu pbdj qcyi nwmf')
app.config['MAIL_DEFAULT_SENDER'] = ('Legend Carpet Services', app.config['MAIL_USERNAME'])
app.config['MAIL_MAX_EMAILS'] = None
app.config['MAIL_ASCII_ATTACHMENTS'] = False
app.config['MAIL_DEBUG'] = os.environ.get('FLASK_ENV') == 'development'

# Add these configurations
UPLOAD_FOLDER = 'temp_uploads'
ALLOWED_EXTENSIONS = {'gif', 'png', 'jpg', 'jpeg', 'mp4', 'mov'}
MAX_CONTENT_LENGTH = 10 * 1024 * 1024  # 10MB max file size

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

mail = Mail(app)

# Comprehensive service data matching the home page services
services = {
    "carpet-repair": {
        "url_name": "carpet-repair",
        "name": "Carpet Repair & Patching",
        "description": "Professional carpet repair services to fix burns, tears, and pet damage",
        "long_description": "Don't replace, repair! We fix burns, tears, and pet damage, seamlessly restoring your carpet's original look with expert techniques and color matching.",
        "image_url": "/static/images/before.jpeg",
        "video_url": "videos/Carpet-Repair-g.gif",
        "features": [
            {"title": "Burn Mark Repair", "description": "Expert removal and patching of burn marks and cigarette burns"},
            {"title": "Tear & Hole Patching", "description": "Seamless patching that perfectly matches your carpet texture"},
            {"title": "Pet Damage Restoration", "description": "Complete repair of pet-related carpet damage"},
            {"title": "Color Matching", "description": "Precise color matching for invisible repairs"},
        ],
        "process_steps": [
            {"title": "Assessment", "description": "We evaluate the damage and determine the best repair approach"},
            {"title": "Material Matching", "description": "We source or create matching carpet material"},
            {"title": "Precise Repair", "description": "Expert cutting and installation of the patch"},
            {"title": "Final Blending", "description": "Seamless blending to make repairs invisible"},
        ],
    },
    "carpet-stretching": {
        "url_name": "carpet-stretching",
        "name": "Carpet Re-stretching",
        "description": "Professional carpet stretching to eliminate wrinkles and extend carpet life",
        "long_description": "Tripping hazards be gone! We smooth out wrinkles and bumps, extending your carpet's life and improving safety with professional power stretching equipment.",
        "image_url": "/static/images/after.jpeg",
        "video_url": "videos/Carpet-Restretching-g.gif",
        "features": [
            {"title": "Wrinkle Removal", "description": "Complete elimination of carpet wrinkles and bubbles"},
            {"title": "Safety Improvement", "description": "Removes tripping hazards for a safer home"},
            {"title": "Extended Carpet Life", "description": "Proper stretching extends your carpet's lifespan"},
            {"title": "Professional Equipment", "description": "Power stretchers ensure lasting results"},
        ],
    },
    "water-damage-restoration": {
        "url_name": "water-damage-restoration",
        "name": "Water Damage Restoration",
        "description": "24/7 emergency water damage restoration and flood recovery services",
        "long_description": "Fast 24/7 flood response. We extract water, prevent mold, and restore your carpets to a safe, dry state using industrial-grade equipment.",
        "image_url": "/static/images/before.jpeg",
        "video_url": "videos/Water-Damage-Restoration-g.gif",
        "features": [
            {"title": "24/7 Emergency Response", "description": "Round-the-clock availability for water emergencies"},
            {"title": "Mold Prevention", "description": "Advanced techniques to prevent mold growth"},
            {"title": "Industrial Equipment", "description": "Professional-grade water extraction and drying"},
            {"title": "Insurance Assistance", "description": "Help with insurance claims and documentation"},
        ],
    },
    "carpet-cleaning": {
        "url_name": "carpet-cleaning",
        "name": "Carpet Steam Cleaning",
        "description": "Deep steam cleaning to remove dirt, allergens, and odors",
        "long_description": "Our powerful steam cleaning removes deep-seated dirt, allergens, and odors, leaving carpets fresh and hygienic using eco-friendly solutions.",
        "image_url": "/static/images/after.jpeg",
        "video_url": "videos/Carpet-Steam-Cleaning-g.gif",
        "features": [
            {"title": "Deep Stain Removal", "description": "Powerful cleaning removes even stubborn stains"},
            {"title": "Allergen Elimination", "description": "Removes dust mites, pollen, and other allergens"},
            {"title": "Odor Neutralization", "description": "Complete elimination of pet and household odors"},
            {"title": "Fast Drying", "description": "Advanced techniques for quick drying times"},
        ],
    },
    "carpet-installation": {
        "url_name": "carpet-installation",
        "name": "Carpet Installation",
        "description": "Professional carpet installation with perfect fitting and finishing",
        "long_description": "Get a flawless finish with our expert installation. We ensure a perfect fit that enhances your space's comfort and style.",
        "image_url": "/static/images/before.jpeg",
        "video_url": "videos/Carpet-Installation-g.gif",
        "features": [
            {"title": "Custom Fitting", "description": "Precise measurements and custom cutting"},
            {"title": "Professional Installation", "description": "Expert installation techniques for lasting results"},
            {"title": "Style Consultation", "description": "Help choosing the right carpet for your space"},
            {"title": "Warranty Included", "description": "Comprehensive warranty on all installation work"},
        ],
    },
    "upholstery-cleaning": {
        "url_name": "upholstery-cleaning",
        "name": "Upholstery Cleaning",
        "description": "Professional cleaning for sofas, chairs, and fabric furniture",
        "long_description": "Revitalize your sofas and chairs. Our gentle yet effective cleaning removes stains and odors from all fabric types.",
        "image_url": "/static/images/after.jpeg",
        "video_url": "videos/Upholstery-Cleaning-g.gif",
        "features": [
            {"title": "Fabric-Safe Cleaning", "description": "Gentle methods safe for all fabric types"},
            {"title": "Stain Removal", "description": "Expert removal of food, drink, and other stains"},
            {"title": "Odor Elimination", "description": "Complete odor removal and freshening"},
            {"title": "Protection Treatment", "description": "Optional fabric protection for future stain resistance"},
            ],
}
}
# Content for the About Us page
about_content = {
    "title": "About Legend Carpet Services",
    "paragraphs": [
        "At Legend Carpet Services, we take pride in being Melbourne's leading provider of professional and affordable carpet repair, steam cleaning, carpet laying, carpet re-stretching and flood restoration services. Whether you're dealing with minor carpet damage or facing major water damage after a flood, our expert team is committed to restoring your home or office to its best condition.",
        "We understand that every situation is unique, which is why we tailor our services to meet the specific needs of each client. Our fast, reliable, and high-quality solutions don’t just address the immediate issue but also provide long-term benefits for your carpets and property.",
    ],
    "mission": {
        "title": "Our Mission",
        "text": "At Legend Carpet Services, our mission is to deliver top-quality carpet and restoration services while maintaining affordability and professionalism. We understand the importance of a clean and safe environment, and we are dedicated to helping our clients extend the life of their carpets and maintain the cleanliness of their spaces.",
    },
    "why_choose_us": {
        "title": "Why Choose Legend Carpet Services?",
        "points": [
            "Same-day service",
            "Highly experienced technicians",
            "Trustworthy",
            "Fully insured technicians",
            "Exceptional customer service",
        ],
    },
    "our_services": {
        "title": "Our Range of Services",
        "text": "From carpet repair to flood restoration, we offer a wide range of services to keep your home or office looking its best. Whether you need carpet cleaning, patch repairs, or full flood damage recovery, our team is ready to help.",
    },
}


@app.route('/')
def index():
    try:
        return render_template('index.html', services=services)
    except Exception as e:
        app.logger.error(f"Error in index route: {str(e)}")
        return "An error occurred", 500


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/submit_form', methods=['POST'])
def submit_form():
    try:
        if request.method == 'POST':
            # Get the referring page and add #contact anchor
            referring_page = request.referrer or url_for('index')
            referring_page = referring_page + "#contact" if "#contact" not in referring_page else referring_page

            # Collect form data
            name = request.form.get('name')
            phone = request.form.get('phone')
            email = request.form.get('email')
            suburb = request.form.get('suburb')
            service = request.form.get('service')
            description = request.form.get('description')

            # Log form submission
            app.logger.info(f"FORM SUBMISSION - Name: {name}, Phone: {phone}, Email: {email}, Service: {service}")

            # Check if we're in production (no email configured)
            email_configured = app.config.get('MAIL_USERNAME') and app.config.get('MAIL_PASSWORD')
            
            if email_configured:
                # Try to send email (development or properly configured production)
                try:
                    # Create message
                    msg = Message(
                        subject=f"New Quote Request from {name}",
                        recipients=['akshaysomu@gmail.com'],
                        sender=app.config['MAIL_DEFAULT_SENDER']
                    )

                    # Handle file attachments
                    attachments = request.files.getlist('attachments[]')
                    file_names = []
                    
                    if not os.path.exists(UPLOAD_FOLDER):
                        os.makedirs(UPLOAD_FOLDER)

                    for file in attachments:
                        if file and file.filename and allowed_file(file.filename):
                            filename = secure_filename(file.filename)
                            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                            try:
                                file.save(filepath)
                                with open(filepath, 'rb') as f:
                                    msg.attach(filename, file.content_type, f.read())
                                file_names.append(filename)
                                os.remove(filepath)  # Clean up the temp file
                            except Exception as file_error:
                                app.logger.error(f"File handling error: {str(file_error)}")
                                if os.path.exists(filepath):
                                    os.remove(filepath)

                    # Add file names to template context
                    html_body = render_template('email_template.html',
                                            name=name, phone=phone, email=email,
                                            suburb=suburb, service=service,
                                            description=description,
                                            attachments=file_names)
                
                    msg.html = html_body
                    
                    # Send email
                    mail.send(msg)
                    app.logger.info("Email sent successfully")
                    flash("Thank you for your request! We will get back to you shortly.", "success")
                    
                except Exception as email_error:
                    app.logger.error(f"Email sending failed: {str(email_error)}")
                    # Fall back to logging only
                    flash("Thank you for your request! We have received your details and will contact you soon.", "success")
            else:
                # Production fallback - just log the submission
                app.logger.info(f"Form logged - Name: {name}, Phone: {phone}, Email: {email}")
                flash("Thank you for your request! We have received your details and will contact you within 24 hours.", "success")

    except Exception as e:
        app.logger.error(f"Form submission error: {str(e)}")
        flash("Thank you for your interest! Please call us directly at 0416 388 777 for immediate assistance.", "info")

    return redirect(referring_page)


@app.route("/service/<service_name>")
def service(service_name):
    service_data = services.get(service_name)
    if service_data is None:
        abort(404)
    return render_template("service.html", service=service_data)


@app.route("/about")
def about():
    return render_template("about.html", about=about_content)


@app.route("/test")
def test():
    """Simple test endpoint to verify deployment"""
    return {"status": "OK", "message": "Server is running properly", "timestamp": str(os.environ.get('RENDER_SERVICE_NAME', 'local'))}

@app.route("/portfolio")
def portfolio():
    portfolio_images = []
    portfolio_path = os.path.join(app.static_folder, "images", "portfolio")

    print(f"Looking for portfolio images in: {portfolio_path}")
    print(f"Portfolio path exists: {os.path.exists(portfolio_path)}")

    # Define service categories and descriptions for variety
    service_info = [
        {"category": "cleaning", "title": "Deep Steam Cleaning", "description": "Powerful steam cleaning removed years of embedded dirt and stains, restoring the carpet's original vibrancy and freshness."},
        {"category": "repair", "title": "Carpet Repair & Patching", "description": "Expert repair work seamlessly restored damaged areas, making the carpet look brand new with invisible patches."},
        {"category": "restoration", "title": "Water Damage Restoration", "description": "Complete restoration of water-damaged carpet using advanced drying and cleaning techniques to prevent mold."},
        {"category": "cleaning", "title": "Stain Removal Specialist", "description": "Stubborn stains completely eliminated using specialized cleaning solutions and professional techniques."},
        {"category": "repair", "title": "Carpet Stretching", "description": "Professional stretching eliminated wrinkles and bubbles, extending the carpet's lifespan and improving safety."},
        {"category": "cleaning", "title": "Commercial Carpet Cleaning", "description": "High-traffic commercial carpet restored to pristine condition with professional-grade equipment and solutions."},
        {"category": "restoration", "title": "Pet Damage Recovery", "description": "Complete elimination of pet odors and stains using enzyme-based cleaning solutions and restoration techniques."},
        {"category": "repair", "title": "Burn Mark Repair", "description": "Seamless repair of burn marks and cigarette damage with precise color matching and expert patching."},
        {"category": "cleaning", "title": "Upholstery Cleaning", "description": "Gentle yet effective cleaning removed stains and odors from delicate fabric furniture and carpets."},
        {"category": "restoration", "title": "Flood Damage Recovery", "description": "Emergency restoration of flood-damaged carpets using industrial-grade water extraction and drying equipment."},
    ]

    # Create portfolio images list from 1 to 10
    for i in range(1, 11):
        before_filename = f"{i} before.png"
        after_filename = f"{i} after.png" if i != 10 else "10 afterpng.jpeg"

        # Check if portfolio images exist, otherwise use fallback
        before_path = os.path.join(portfolio_path, before_filename)
        after_path = os.path.join(portfolio_path, after_filename)

        before_exists = os.path.exists(before_path)
        after_exists = os.path.exists(after_path)

        print(
            f"Checking {i}: {before_filename} exists: {before_exists}, {after_filename} exists: {after_exists}"
        )

        # Get service info for this item (cycle through the list)
        service = service_info[(i - 1) % len(service_info)]

        # Use portfolio images if they exist, otherwise use fallback images
        if before_exists and after_exists:
            before_image = f"images/portfolio/{before_filename}"
            after_image = f"images/portfolio/{after_filename}"
        else:
            # Use fallback images
            before_image = "images/before.jpeg"
            after_image = "images/after.jpeg"

        portfolio_images.append(
            {
                "before": before_image,
                "after": after_image,
                "title": service["title"],
                "description": service["description"],
                "category": service["category"],
                "id": i,
                "using_fallback": not (before_exists and after_exists),
            }
        )

    print(f"Total portfolio images: {len(portfolio_images)}")
    return render_template("portfolio.html", portfolio_images=portfolio_images)

if __name__ == '__main__':
    app.logger.setLevel(logging.INFO)
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_ENV') == 'development'
    app.run(host='0.0.0.0', port=port, debug=debug)