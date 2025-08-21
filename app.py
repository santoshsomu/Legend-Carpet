import os
from flask import Flask, render_template, abort

app = Flask(__name__)

# Comprehensive service data matching the home page services
services = {
    "carpet-repair": {
        "url_name": "carpet-repair",
        "name": "Carpet Repair & Patching",
        "description": "Professional carpet repair services to fix burns, tears, and pet damage",
        "long_description": "Don't replace, repair! We fix burns, tears, and pet damage, seamlessly restoring your carpet's original look with expert techniques and color matching.",
        "image_url": "/static/images/before.jpeg",
        "features": [
            {
                "title": "Burn Mark Repair",
                "description": "Expert removal and patching of burn marks and cigarette burns",
            },
            {
                "title": "Tear & Hole Patching",
                "description": "Seamless patching that perfectly matches your carpet texture",
            },
            {
                "title": "Pet Damage Restoration",
                "description": "Complete repair of pet-related carpet damage",
            },
            {
                "title": "Color Matching",
                "description": "Precise color matching for invisible repairs",
            },
        ],
        "process_steps": [
            {
                "title": "Assessment",
                "description": "We evaluate the damage and determine the best repair approach",
            },
            {
                "title": "Material Matching",
                "description": "We source or create matching carpet material",
            },
            {
                "title": "Precise Repair",
                "description": "Expert cutting and installation of the patch",
            },
            {
                "title": "Final Blending",
                "description": "Seamless blending to make repairs invisible",
            },
        ],
    },
    "carpet-stretching": {
        "url_name": "carpet-stretching",
        "name": "Carpet Re-stretching",
        "description": "Professional carpet stretching to eliminate wrinkles and extend carpet life",
        "long_description": "Tripping hazards be gone! We smooth out wrinkles and bumps, extending your carpet's life and improving safety with professional power stretching equipment.",
        "image_url": "/static/images/after.jpeg",
        "features": [
            {
                "title": "Wrinkle Removal",
                "description": "Complete elimination of carpet wrinkles and bubbles",
            },
            {
                "title": "Safety Improvement",
                "description": "Removes tripping hazards for a safer home",
            },
            {
                "title": "Extended Carpet Life",
                "description": "Proper stretching extends your carpet's lifespan",
            },
            {
                "title": "Professional Equipment",
                "description": "Power stretchers ensure lasting results",
            },
        ],
    },
    "water-damage-restoration": {
        "url_name": "water-damage-restoration",
        "name": "Water Damage Restoration",
        "description": "24/7 emergency water damage restoration and flood recovery services",
        "long_description": "Fast 24/7 flood response. We extract water, prevent mold, and restore your carpets to a safe, dry state using industrial-grade equipment.",
        "image_url": "/static/images/before.jpeg",
        "features": [
            {
                "title": "24/7 Emergency Response",
                "description": "Round-the-clock availability for water emergencies",
            },
            {
                "title": "Mold Prevention",
                "description": "Advanced techniques to prevent mold growth",
            },
            {
                "title": "Industrial Equipment",
                "description": "Professional-grade water extraction and drying",
            },
            {
                "title": "Insurance Assistance",
                "description": "Help with insurance claims and documentation",
            },
        ],
    },
    "carpet-cleaning": {
        "url_name": "carpet-cleaning",
        "name": "Carpet Steam Cleaning",
        "description": "Deep steam cleaning to remove dirt, allergens, and odors",
        "long_description": "Our powerful steam cleaning removes deep-seated dirt, allergens, and odors, leaving carpets fresh and hygienic using eco-friendly solutions.",
        "image_url": "/static/images/after.jpeg",
        "features": [
            {
                "title": "Deep Stain Removal",
                "description": "Powerful cleaning removes even stubborn stains",
            },
            {
                "title": "Allergen Elimination",
                "description": "Removes dust mites, pollen, and other allergens",
            },
            {
                "title": "Odor Neutralization",
                "description": "Complete elimination of pet and household odors",
            },
            {
                "title": "Fast Drying",
                "description": "Advanced techniques for quick drying times",
            },
        ],
    },
    "carpet-installation": {
        "url_name": "carpet-installation",
        "name": "Carpet Installation",
        "description": "Professional carpet installation with perfect fitting and finishing",
        "long_description": "Get a flawless finish with our expert installation. We ensure a perfect fit that enhances your space's comfort and style.",
        "image_url": "/static/images/before.jpeg",
        "features": [
            {
                "title": "Custom Fitting",
                "description": "Precise measurements and custom cutting",
            },
            {
                "title": "Professional Installation",
                "description": "Expert installation techniques for lasting results",
            },
            {
                "title": "Style Consultation",
                "description": "Help choosing the right carpet for your space",
            },
            {
                "title": "Warranty Included",
                "description": "Comprehensive warranty on all installation work",
            },
        ],
    },
    "upholstery-cleaning": {
        "url_name": "upholstery-cleaning",
        "name": "Upholstery Cleaning",
        "description": "Professional cleaning for sofas, chairs, and fabric furniture",
        "long_description": "Revitalize your sofas and chairs. Our gentle yet effective cleaning removes stains and odors from all fabric types.",
        "image_url": "/static/images/after.jpeg",
        "features": [
            {
                "title": "Fabric-Safe Cleaning",
                "description": "Gentle methods safe for all fabric types",
            },
            {
                "title": "Stain Removal",
                "description": "Expert removal of food, drink, and other stains",
            },
            {
                "title": "Odor Elimination",
                "description": "Complete odor removal and freshening",
            },
            {
                "title": "Protection Treatment",
                "description": "Optional fabric protection for future stain resistance",
            },
        ],
    },
}


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/service/<service_name>")
def service(service_name):
    service_data = services.get(service_name)
    if service_data is None:
        abort(404)
    return render_template("service.html", service=service_data)


# Add individual service routes for direct access
@app.route("/carpet-repair")
def carpet_repair():
    return render_template("service.html", service=services["carpet-repair"])


@app.route("/carpet-stretching")
def carpet_stretching():
    return render_template("service.html", service=services["carpet-stretching"])


@app.route("/water-damage-restoration")
def water_damage_restoration():
    return render_template("service.html", service=services["water-damage-restoration"])


@app.route("/carpet-cleaning")
def carpet_cleaning():
    return render_template("service.html", service=services["carpet-cleaning"])


@app.route("/carpet-installation")
def carpet_installation():
    return render_template("service.html", service=services["carpet-installation"])


@app.route("/upholstery-cleaning")
def upholstery_cleaning():
    return render_template("service.html", service=services["upholstery-cleaning"])


@app.route("/portfolio")
def portfolio():
    portfolio_images = []
    portfolio_path = os.path.join(app.static_folder, "images", "portfolio")

    print(f"Looking for portfolio images in: {portfolio_path}")
    print(f"Portfolio path exists: {os.path.exists(portfolio_path)}")

    # Define service categories and descriptions for variety
    service_info = [
        {
            "category": "cleaning",
            "title": "Deep Steam Cleaning",
            "description": "Powerful steam cleaning removed years of embedded dirt and stains, restoring the carpet's original vibrancy and freshness.",
        },
        {
            "category": "repair",
            "title": "Carpet Repair & Patching",
            "description": "Expert repair work seamlessly restored damaged areas, making the carpet look brand new with invisible patches.",
        },
        {
            "category": "restoration",
            "title": "Water Damage Restoration",
            "description": "Complete restoration of water-damaged carpet using advanced drying and cleaning techniques to prevent mold.",
        },
        {
            "category": "cleaning",
            "title": "Stain Removal Specialist",
            "description": "Stubborn stains completely eliminated using specialized cleaning solutions and professional techniques.",
        },
        {
            "category": "repair",
            "title": "Carpet Stretching",
            "description": "Professional stretching eliminated wrinkles and bubbles, extending the carpet's lifespan and improving safety.",
        },
        {
            "category": "cleaning",
            "title": "Commercial Carpet Cleaning",
            "description": "High-traffic commercial carpet restored to pristine condition with professional-grade equipment and solutions.",
        },
        {
            "category": "restoration",
            "title": "Pet Damage Recovery",
            "description": "Complete elimination of pet odors and stains using enzyme-based cleaning solutions and restoration techniques.",
        },
        {
            "category": "repair",
            "title": "Burn Mark Repair",
            "description": "Seamless repair of burn marks and cigarette damage with precise color matching and expert patching.",
        },
        {
            "category": "cleaning",
            "title": "Upholstery Cleaning",
            "description": "Gentle yet effective cleaning removed stains and odors from delicate fabric furniture and carpets.",
        },
        {
            "category": "restoration",
            "title": "Flood Damage Recovery",
            "description": "Emergency restoration of flood-damaged carpets using industrial-grade water extraction and drying equipment.",
        },
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


@app.route("/debug-portfolio")
def debug_portfolio():
    """Debug route to check portfolio images"""
    portfolio_path = os.path.join(app.static_folder, "images", "portfolio")
    debug_info = {
        "portfolio_path": portfolio_path,
        "path_exists": os.path.exists(portfolio_path),
        "static_folder": app.static_folder,
        "files": [],
    }

    if os.path.exists(portfolio_path):
        debug_info["files"] = os.listdir(portfolio_path)

    # Create HTML debug page with image previews
    html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <title>Portfolio Debug</title>
        <style>
            body {{ font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }}
            .image-pair {{ margin: 20px 0; padding: 20px; border: 1px solid #ddd; background: white; border-radius: 8px; }}
            .image-pair img {{ max-width: 200px; margin: 10px; border: 1px solid #ccc; border-radius: 4px; }}
            .debug-info {{ background: #e8f4fd; padding: 15px; margin: 10px 0; border-radius: 8px; }}
            .success {{ color: green; font-weight: bold; }}
            .error {{ color: red; font-weight: bold; }}
            .image-container {{ display: flex; gap: 20px; align-items: center; }}
        </style>
    </head>
    <body>
        <h1>Portfolio Debug Information</h1>
        <div class="debug-info">
            <h3>Debug Info:</h3>
            <pre>{debug_info}</pre>
        </div>
        
        <h2>Image Previews</h2>
        <p>Testing all portfolio image pairs. Green border = loaded successfully, Red border = failed to load.</p>
    """

    if os.path.exists(portfolio_path):
        for i in range(1, 11):
            before_filename = f"{i} before.png"
            after_filename = f"{i} after.png" if i != 10 else "10 afterpng.jpeg"

            before_path = os.path.join(portfolio_path, before_filename)
            after_path = os.path.join(portfolio_path, after_filename)

            before_exists = os.path.exists(before_path)
            after_exists = os.path.exists(after_path)

            html += f"""
            <div class="image-pair">
                <h3>Image Pair {i}</h3>
                <p>Before: {before_filename} <span class="{'success' if before_exists else 'error'}">(exists: {before_exists})</span></p>
                <p>After: {after_filename} <span class="{'success' if after_exists else 'error'}">(exists: {after_exists})</span></p>
                <div class="image-container">
                    <div>
                        <p><strong>Before Image:</strong></p>
                        <img src="/static/images/portfolio/{before_filename}" alt="Before {i}" 
                            onload="this.style.border='3px solid green';" 
                            onerror="this.style.border='3px solid red'; this.alt='Failed to load';">
                    </div>
                    <div>
                        <p><strong>After Image:</strong></p>
                        <img src="/static/images/portfolio/{after_filename}" alt="After {i}" 
                            onload="this.style.border='3px solid green';" 
                            onerror="this.style.border='3px solid red'; this.alt='Failed to load';">
                    </div>
                </div>
            </div>
            """

    html += """
        <div style="margin-top: 40px; padding: 20px; background: #fff3cd; border-radius: 8px;">
            <h3>How to Fix Image Issues:</h3>
            <ol>
                <li>Make sure all image files exist in the portfolio folder</li>
                <li>Check file names match exactly (case-sensitive)</li>
                <li>Verify image files are not corrupted</li>
                <li>Ensure Flask static file serving is working</li>
            </ol>
        </div>
        </body>
    </html>
    """

    return html


@app.route("/test-video")
def test_video():
    """Simple test to check if the hero background video is accessible"""
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <title>Video Test</title>
        <style>
            body {{ font-family: Arial, sans-serif; margin: 20px; }}
            video {{ max-width: 600px; margin: 10px; border: 2px solid #ccc; }}
            .success {{ border-color: green; }}
            .error {{ border-color: red; }}
            .info {{ background: #f0f0f0; padding: 10px; margin: 10px 0; }}
        </style>
    </head>
    <body>
        <h1>Hero Background Video Test</h1>
        
        <div class="info">
            <p><strong>Testing video file:</strong> /static/videos/hero background.mp4</p>
            <p><strong>Expected behavior:</strong> Video should load and play with controls</p>
        </div>
        
        <h2>Video Test (with controls):</h2>
        <video controls 
               onloadeddata="this.className='success'; console.log('Video loaded successfully')" 
               onerror="this.className='error'; console.error('Video failed to load')">
            <source src="/static/videos/hero background.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        
        <h2>Video Test (autoplay like hero section):</h2>
        <video autoplay loop muted playsinline
               onloadeddata="this.className='success'; console.log('Autoplay video loaded')" 
               onerror="this.className='error'; console.error('Autoplay video failed')">
            <source src="/static/videos/hero background.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        
        <p><strong>Instructions:</strong></p>
        <ul>
            <li>Green border = video loaded successfully</li>
            <li>Red border = video failed to load</li>
            <li>Check browser console for detailed error messages</li>
        </ul>
        
        <script>
            console.log('Testing video accessibility...');
            fetch('/static/videos/hero background.mp4')
                .then(response => {{
                    console.log('Video file response status:', response.status);
                    console.log('Video file response headers:', response.headers);
                }})
                .catch(error => {{
                    console.error('Error fetching video file:', error);
                }});
        </script>
    </body>
    </html>
    """


@app.route("/video-test-2")
def video_test_2():
    return render_template("video_test.html")


if __name__ == "__main__":
    app.run(debug=True)
