import xml.etree.ElementTree as ET

# Load the XML file
xml_files = [
    "backend/backend/database/BJNR001950896.xml",
    "backend/backend/database/BJNR005330950.xml",
    "backend/backend/database/BJNR258700008.xml",
]

for xml_file in xml_files:
    for xml_file in xml_files:
        # Load the XML file
        tree = ET.parse(xml_file)
        root = tree.getroot()

        # List to store extracted information for the current XML file
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
        import json
        # Create a JSON file for the current XML file
        json_filename = f"{xml_file.split('/')[-1].replace('.xml', '_output.json')}"
        with open(json_filename, "w", encoding="utf-8") as json_file:
            json.dump(sections, json_file, ensure_ascii=False, indent=2)
            