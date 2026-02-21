#!/usr/bin/env python3
"""
Generate a comprehensive project report PDF for My Music Web Page
"""

from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, PageBreak
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
from datetime import datetime
import os

# Define output path
output_path = os.path.join(os.path.dirname(__file__), "Project_Report.pdf")

# Create PDF document
doc = SimpleDocTemplate(output_path, pagesize=letter,
                        rightMargin=0.5*inch, leftMargin=0.5*inch,
                        topMargin=0.5*inch, bottomMargin=0.5*inch)

# Container for the 'Flowable' objects
elements = []

# Define styles
styles = getSampleStyleSheet()

# Custom styles
title_style = ParagraphStyle(
    'CustomTitle',
    parent=styles['Heading1'],
    fontSize=24,
    textColor=colors.HexColor('#1DB954'),  # Spotify Green-ish for Music theme
    spaceAfter=6,
    alignment=TA_CENTER,
    fontName='Helvetica-Bold'
)

heading_style = ParagraphStyle(
    'CustomHeading',
    parent=styles['Heading2'],
    fontSize=14,
    textColor=colors.HexColor('#1DB954'),
    spaceAfter=10,
    spaceBefore=10,
    fontName='Helvetica-Bold'
)

normal_style = ParagraphStyle(
    'CustomNormal',
    parent=styles['Normal'],
    fontSize=10,
    alignment=TA_JUSTIFY,
    spaceAfter=6
)

# Add title
elements.append(Paragraph("My Music Web Page", title_style))
elements.append(Paragraph("Project Report", styles['Heading2']))
elements.append(Spacer(1, 0.3*inch))

# Add metadata
metadata_data = [
    ['Project Name', 'My Music Web Page'],
    ['Repository', 'https://github.com/AdityaPrakash-7/myMusicWebPage.git'],
    ['Report Generated', datetime.now().strftime('%B %d, %Y at %H:%M')],
    ['Branch', 'main'],
]

metadata_table = Table(metadata_data, colWidths=[2*inch, 4*inch])
metadata_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#f0fdf4')),
    ('TEXTCOLOR', (0, 0), (-1, -1), colors.black),
    ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
    ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
    ('FONTSIZE', (0, 0), (-1, -1), 10),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ('TOPPADDING', (0, 0), (-1, -1), 8),
    ('GRID', (0, 0), (-1, -1), 1, colors.grey),
]))

elements.append(metadata_table)
elements.append(Spacer(1, 0.3*inch))

# Project Overview
elements.append(Paragraph("1. PROJECT OVERVIEW", heading_style))
overview_text = """
My Music Web Page is a dynamic, responsive web application designed to provide users with a seamless audio streaming experience. 
Built with React, it features a modern user interface that allows users to browse a library of songs, control playback, 
and enjoy visual feedback through a custom-designed player. The project demonstrates effective state management and 
DOM manipulation to handle audio events and user interactions efficiently.
"""
elements.append(Paragraph(overview_text.strip(), normal_style))
elements.append(Spacer(1, 0.2*inch))

# Key Features
elements.append(Paragraph("2. KEY FEATURES", heading_style))
features = [
    "Audio Playback: Full control with Play, Pause, Next, and Previous functionality",
    "Song Library: Interactive list of available tracks with active song highlighting",
    "Progress Control: Real-time seek bar and duration display",
    "Volume Management: Adjustable volume slider with mute capability",
    "Responsive Design: Optimized layout for both desktop and mobile devices",
    "Cover Art Display: Dynamic album artwork updates based on current track",
    "Auto-Play: Seamless transition to the next song when a track finishes",
    "Modern UI: Clean aesthetics with smooth transitions and hover effects",
]

for feature in features:
    elements.append(Paragraph(f"• {feature}", normal_style))

elements.append(Spacer(1, 0.2*inch))

# Technology Stack
elements.append(Paragraph("3. TECHNOLOGY STACK", heading_style))

tech_data = [
    ['Technology', 'Purpose'],
    ['React', 'Component-based UI architecture'],
    ['Vite', 'Fast development server and bundling'],
    ['HTML5 Audio API', 'Core audio playback and event handling'],
    ['CSS3 / SCSS', 'Styling, animations, and responsive layout'],
    ['JavaScript (ES6+)', 'Logic, state management, and async operations'],
]

tech_table = Table(tech_data, colWidths=[2*inch, 4*inch])
tech_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1DB954')),
    ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
    ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
    ('FONTSIZE', (0, 0), (-1, 0), 10),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ('TOPPADDING', (0, 0), (-1, -1), 8),
    ('GRID', (0, 0), (-1, -1), 1, colors.grey),
    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f0fdf4')]),
]))

elements.append(tech_table)
elements.append(Spacer(1, 0.2*inch))

# Project Structure
elements.append(Paragraph("4. PROJECT STRUCTURE", heading_style))

structure_text = """
<b>Source Directory (/src):</b><br/>
• App.jsx - Main component orchestrating the player and library<br/>
• components/ - Reusable UI elements (Player, Song, Library, Nav)<br/>
• styles/ - Global styles and component-specific CSS/SCSS<br/>
• data.js - Static data file containing song information (URLs, Cover Art, Artist)<br/>
• assets/ - Images and icons used throughout the application<br/>
<br/>
<b>Key Components:</b><br/>
• <b>Player:</b> Handles the audio controls (play/pause, skip) and progress bar.<br/>
• <b>Song:</b> Displays the current song's cover art, title, and artist.<br/>
• <b>Library:</b> A drawer or list view showing all available songs.<br/>
"""

elements.append(Paragraph(structure_text, normal_style))
elements.append(Spacer(1, 0.2*inch))

# Functionality Details
elements.append(Paragraph("5. FUNCTIONALITY DETAILS", heading_style))

func_text = """
<b>State Management:</b><br/>
The application uses React's useState and useRef hooks to manage the current song, playing status, 
song info (current time, duration), and library visibility. The useRef hook is crucial for accessing 
the HTML audio element directly to trigger play/pause methods.<br/>
<br/>
<b>Audio Handling:</b><br/>
The HTML5 <code>&lt;audio&gt;</code> element is wrapped in React logic. Event listeners update the 
state as the song plays (updating the progress bar) or when it ends (triggering the next song).<br/>
<br/>
<b>User Interface:</b><br/>
The UI is designed to be intuitive. The library can often be toggled open or closed. When a user 
clicks a song in the library, it becomes the active song, and playback starts immediately.<br/>
"""
elements.append(Paragraph(func_text, normal_style))
elements.append(PageBreak())

# Build & Deployment
elements.append(Paragraph("6. BUILD & DEPLOYMENT", heading_style))

scripts_data = [
    ['Command', 'Description'],
    ['npm run dev', 'Start local development server'],
    ['npm run build', 'Compile and minify for production'],
    ['npm run preview', 'Preview the production build locally'],
]

scripts_table = Table(scripts_data, colWidths=[2*inch, 3.5*inch])
scripts_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1DB954')),
    ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
    ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
    ('FONTSIZE', (0, 0), (-1, -1), 9),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ('TOPPADDING', (0, 0), (-1, -1), 8),
    ('GRID', (0, 0), (-1, -1), 1, colors.grey),
    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f0fdf4')]),
]))

elements.append(scripts_table)
elements.append(Spacer(1, 0.2*inch))

# Future Enhancements
elements.append(Paragraph("7. FUTURE ENHANCEMENTS", heading_style))

future_text = """
• <b>Spotify/SoundCloud API:</b> Integrate real streaming APIs instead of local data.<br/>
• <b>Lyrics Integration:</b> Fetch and display synchronized lyrics.<br/>
• <b>Dark/Light Mode:</b> Theme switching capability.<br/>
• <b>Drag & Drop:</b> Allow users to upload their own local audio files to play.<br/>
• <b>Visualizer:</b> Add a canvas-based audio frequency visualizer.<br/>
"""
elements.append(Paragraph(future_text, normal_style))
elements.append(Spacer(1, 0.2*inch))

# Conclusion
elements.append(Paragraph("8. CONCLUSION", heading_style))

conclusion_text = """
The My Music Web Page project successfully demonstrates the capability to build a functional and 
aesthetically pleasing media application using React. It handles complex DOM interactions (audio) 
within the React lifecycle effectively. The modular component structure ensures the code is 
maintainable and scalable for future features like API integration or advanced playlist management.
"""
elements.append(Paragraph(conclusion_text, normal_style))

# Footer
elements.append(Spacer(1, 0.5*inch))
footer_style = ParagraphStyle(
    'Footer',
    parent=styles['Normal'],
    fontSize=9,
    textColor=colors.grey,
    alignment=TA_CENTER,
)
elements.append(Paragraph("---", footer_style))
elements.append(Paragraph(f"Report Generated: {datetime.now().strftime('%B %d, %Y at %H:%M:%S')}", footer_style))
elements.append(Paragraph("This is an automated project report.", footer_style))

# Build PDF
doc.build(elements)

print(f"✅ Music Project report generated successfully!")
print(f"📄 File saved to: {output_path}")
print(f"📊 Ready for download!")