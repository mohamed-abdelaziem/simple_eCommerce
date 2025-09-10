from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet

# إنشاء ملف PDF كـ "تصميم مرئي Mockup"
file_path = "/mnt/data/payment_instructions_mockup.pdf"

doc = SimpleDocTemplate(file_path, pagesize=A4)
styles = getSampleStyleSheet()
story = []

# عنوان الصفحة
story.append(Paragraph("<b>طرق الدفع (Vodafone Cash & Instapay)</b>", styles['Title']))
story.append(Spacer(1, 20))
story.append(Paragraph("من فضلك اتبع التعليمات بدقة لتأكيد طلبك بسرعة.", styles['Normal']))
story.append(Spacer(1, 20))

# Vodafone Cash Card
vodafone_data = [
    ["<b>Vodafone Cash</b>", ""],
    ["رقم التحويل:", "0100 000 0000"],
    ["", "[ زر نسخ الرقم ]   [ QR ]"],
    ["الخطوات:", "1. حوِّل على الرقم أعلاه<br/>2. اكتب رقم الطلب في الملاحظات<br/>3. ابعت سكرين + رقم العملية"],
    ["ملاحظة:", "التأكيد خلال 30–120 دقيقة في مواعيد العمل"]
]
vodafone_table = Table(vodafone_data, colWidths=[120, 350])
vodafone_table.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#e60000")),
    ('TEXTCOLOR', (0,0), (-1,0), colors.white),
    ('BOX', (0,0), (-1,-1), 1, colors.black),
    ('BACKGROUND', (0,1), (-1,-1), colors.whitesmoke),
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('INNERGRID', (0,0), (-1,-1), 0.5, colors.grey)
]))
story.append(vodafone_table)
story.append(Spacer(1, 30))

# Instapay Card
insta_data = [
    ["<b>Instapay</b>", ""],
    ["Instapay ID:", "store@bankname"],
    ["", "[ زر نسخ الـ ID ]   [ QR ]"],
    ["الخطوات:", "1. حوِّل باستخدام Instapay ID أو IBAN<br/>2. اكتب رقم الطلب في خانة الغرض<br/>3. ابعت سكرين + رقم العملية"],
    ["", ""]
]
insta_table = Table(insta_data, colWidths=[120, 350])
insta_table.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#0077ff")),
    ('TEXTCOLOR', (0,0), (-1,0), colors.white),
    ('BOX', (0,0), (-1,-1), 1, colors.black),
    ('BACKGROUND', (0,1), (-1,-1), colors.whitesmoke),
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('INNERGRID', (0,0), (-1,-1), 0.5, colors.grey)
]))
story.append(insta_table)
story.append(Spacer(1, 30))

# Customer Service Card
cs_data = [
    ["<b>خدمة العملاء</b>", ""],
    ["واتساب:", "0100 000 0000"],
    ["مواعيد العمل:", "10 ص – 8 م (عدا الجمعة)"]
]
cs_table = Table(cs_data, colWidths=[120, 350])
cs_table.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), colors.lightgrey),
    ('BOX', (0,0), (-1,-1), 1, colors.black),
    ('BACKGROUND', (0,1), (-1,-1), colors.whitesmoke),
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('INNERGRID', (0,0), (-1,-1), 0.5, colors.grey)
]))
story.append(cs_table)

doc.build(story)

file_path
