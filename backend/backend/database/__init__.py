import xml.etree.ElementTree as ET

# Load the XML file
tree = ET.parse("backend/backend/database/BJNR001950896.xml")
#tree = ET.parse("backend/backend/database/BJNR005330950.xml")
root = tree.getroot()

# List to store extracted information
sections = []

# Iterate through each 'norm' element in the XML
for norm_element in root.findall("norm"):
    metadaten = norm_element.find("metadaten")
    textdaten = norm_element.find("textdaten/text/Content/P")
    enbez_element = metadaten.find("enbez")
    title_element = metadaten.find("titel")


    # Extract relevant information
    jurabk = metadaten.find("jurabk").text
    enbez = enbez_element.text if enbez_element is not None and enbez_element.text is not None else ""
    titel = title_element.text if title_element is not None and title_element.text is not None else ""
    content = textdaten.text if textdaten is not None else ""

    # Create a dictionary with extracted information
    section_info = {"jurabk": jurabk, "enbez": enbez, "titel": titel, "content": content}

    # Append the dictionary to the list
    sections.append(section_info)

# Print or use the 'sections' list as needed
print(sections)



# Create a new XML structure with the extracted information
new_root = ET.Element("root")

for section_info in sections:
    norm_element = ET.Element("norm")
    metadaten_element = ET.SubElement(norm_element, "metadaten")
    ET.SubElement(metadaten_element, "jurabk").text = section_info["jurabk"]
    ET.SubElement(metadaten_element, "enbez").text = section_info["enbez"]
    ET.SubElement(metadaten_element, "titel").text = section_info["titel"]

    textdaten_element = ET.SubElement(norm_element, "textdaten")
    text_element = ET.SubElement(textdaten_element, "text")
    content_element = ET.SubElement(text_element, "Content")
    ET.SubElement(content_element, "P").text = section_info["content"]

    new_root.append(norm_element)

# Create the new XML tree
new_tree = ET.ElementTree(new_root)

# Save the new XML to a file
new_tree.write("output.xml", encoding="utf-8", xml_declaration=True)

import json

# Your existing code to extract information into the 'sections' list

# Store the 'sections' list in a JSON file
with open("output.json", "w", encoding="utf-8") as json_file:
    json.dump(sections, json_file, ensure_ascii=False, indent=2)
