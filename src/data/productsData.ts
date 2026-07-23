import { Product } from "../types";

const RAW_ACCESSORIES_DATA: [string, string, string, number, number, string, string][] = [
  ["SKU", "Name", "Accessories", 0, 0, "Image", "Description"],
  ["AC-HID-PIVCLASS-40HNKS-03-0004XR", "HID SIGNO PIV RDR 40HNKS-03-0004XR", "HID", 578.89, 151, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40NKS-00-000000_071620.jpg", "Signo PIV 40; Pigtal; Prox Enabled; HDX; 200Bit FASC-N with UUID 128Bit fallback"],
  ["AC-HID-PIVCLASS-40KHTKS-03-0004XR", "HID SIGNO PIV RDR 40KHTKS-03-0004XR", "HID", 901.87, 84, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40KNKS-00-000000_071620.jpg", "Signo PIV 40K; Keypad; Terminal; Prox Enabled; HDX; 200Bit FASC-N with UUID 128Bit fallback"],
  ["AC-HID-PIVCLASS-PVC-CM-REDNT-MS", "HID PVC-CM-REDNT-MS", "HID", 1676.72, 73, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/ACM/pivclass-certificate-manager-cd_03252021.jpg", "CERTIFICATE MANAGER; STD M&S 8X5 M-F CST; REDUNDANT (Requires pivCLASS Supplemental Ordering Information form with ALL orders found in the pivCLASS How To Order Guide https://www.hidglobal.com/documents/how-to-order)"],
  ["AC-SALTO-ASSEMBLY-TOOL-NEOXX-PADLOCK-SP226009", "SALTO SP226009", "SALTO", 42.08, 164, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-NEOXX-ASSEMBLY-TOOL-03242021.jpg", "Assembly Tool|Neoxx Padlock;  (Available only in the USA and Canada)"],
  ["AC-SALTO-BLUENET-BLACK-GATEWAYB3CUS", "SALTO GATEWAYB3CUS", "SALTO", 1020.86, 105, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-BLUENET-BLACK-GATEWAYB3CUS-03242021.jpg", "Wireless Gateway|BLUEnet node|black|12VDC xfmr; Ethernet|supports upto 6 additional wired nodes (Available only in the USA and Canada)"],
  ["AC-SALTO-BLUENET-WHITE-GATEWAYW3CUS", "SALTO GATEWAYW3CUS", "SALTO", 1020.86, 101, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-BLUENET-WHITE-GATEWAYW3CUS-03242021.jpg", "Wireless Gateway|BLUEnet node|white|12VDC xfmr; Ethernet|supports upto 6 additional wired nodes (Available only in the USA and Canada)"],
  ["AC-SALTO-CONTROL-UNIT-IP-CLEARCOVER-CU42E0TUS", "SALTO CU42E0TUS", "SALTO", 1848.08, 98, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-CONTROL-CU42E0T-03242021.jpg", "Control Unit|XS4 2.0|two rdr|6 in|4 out|ethernet; expandable via RS485|12VDC xfmr|encl|clear cover (Available only in the USA and Canada)"],
  ["AC-SALTO-CONTROL-UNIT-IP-GREYCOVER-CU42E0GUS", "SALTO CU42E0GUS", "SALTO", 1848.08, 87, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-CONTROL-CU42xxG-03242021.jpg", "Control Unit|XS4 2.0|two rdr|6 in|4 out|ethernet; expandable via RS485|12VDC xfmr|encl|Grey cover (Available only in the USA and Canada)"],
  ["AC-SALTO-CONTROL-UNIT-IP-NOCOVER-CU42E0US", "SALTO CU42E0US", "SALTO", 1848.08, 164, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-CONTROL-CU42E0-03242021.jpg", "Control Unit|XS4 2.0|two rdr|6 in|4 out|ethernet; expandable via RS485|12VDC xfmr|No enclosure (Available only in the USA and Canada)"],
  ["AC-SALTO-CONTROL-UNIT-RS485-CLEARCOVER-CU4200TUS", "SALTO CU4200TUS", "SALTO", 1051.76, 83, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-CONTROL-CU4200T-03242021.jpg", "Control Unit|XS4 2.0|two rdr|6 in|4 out|RS485 aux; offline or exp of CU42Ex|12V xfmr|encl|Clear cover (Available only in the USA and Canada)"],
  ["AC-SALTO-CONTROL-UNIT-RS485-GREYCOVER-CU4200GUS", "SALTO CU4200GUS", "SALTO", 1051.76, 156, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-CONTROL-CU42xxG-03242021.jpg", "Control Unit|XS4 2.0|two rdr|6 in|4 out|RS485 aux; offline or exp of CU42Ex|12V xfmr|encl|Grey cover (Available only in the USA and Canada)"],
  ["AC-SALTO-CONTROL-UNIT-RS485-NOCOVER-CU4200US", "SALTO CU4200US", "SALTO", 1051.76, 164, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-CONTROL-CU4200-03242021.jpg", "Control Unit|XS4 2.0|two rdr|6 in|4 out|RS485 aux; offline or exp of CU42Ex|12VDC xfmr|No enclosure (Available only in the USA and Canada)"],
  ["AC-SALTO-CREDENTIAL-CONSTRUCTION-MIFARE-PCM01KC", "SALTO PCM01KC", "SALTO", 38.34, 184, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-CARD-03242021.jpg", "Credential|Construction Card|Mifare; testing and management prior to initialization"],
  ["AC-SALTO-CREDENTIAL-FOB-SVN-BLUE-PFD04KBSVNKS-5", "SALTO PFD04KBSVNKS-5", "SALTO", 115.98, 139, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/TAG-MULTI-LINE-KM-030222.jpg", "SVNKS |SALTO KS + SVN compatible Tags - Blue - Pack of 5 (Available only in the USA and Canada)"],
  ["AC-SALTO-CREDENTIAL-FOB-SVN-GREEN-PFD04KGSVNKS-5", "SALTO PFD04KGSVNKS-5", "SALTO", 115.98, 81, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/TAG-MULTI-LINE-KM-030222.jpg", "SVNKS |SALTO KS + SVN compatible Tags - Green - Pack of 5 (Available only in the USA and Canada)"],
  ["AC-SALTO-CREDENTIAL-FOB-SVN-RED-PFD04KRSVNKS-5", "SALTO PFD04KRSVNKS-5", "SALTO", 115.98, 145, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/TAG-MULTI-LINE-KM-030222.jpg", "SVNKS |SALTO KS + SVN compatible Tags - Red - Pack of 5 (Available only in the USA and Canada)"],
  ["AC-SALTO-CREDENTIAL-FOB-SVN-SILVER-PFD04KSSVNKS-5", "SALTO PFD04KSSVNKS-5", "SALTO", 115.98, 124, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/TAG-MULTI-LINE-KM-030222.jpg", "SVNKS |SALTO KS + SVN compatible Tags - Silver - Pack of 5 (Available only in the USA and Canada)"],
  ["AC-SALTO-CREDENTIAL-FOB-SVN-WHITE-PFD04KWSVNKS-5", "SALTO PFD04KWSVNKS-5", "SALTO", 115.98, 74, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/TAG-MULTI-LINE-KM-030222.jpg", "SVNKS |SALTO KS + SVN compatible Tags - White - Pack of 5 (Available only in the USA and Canada)"],
  ["AC-SALTO-DESFIRE-2K-CCVD20700-50", "Salto Credential CCVD20700-50", "SALTO", 327.95, 73, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Credential CCVD20700-50 card; DESFire 2K; pack of 50"],
  ["AC-SALTO-DOOR-DETECTOR-ESCUTCHEON-RFDTCTS18W01", "SALTO RFDTCTS18W01", "SALTO", 69.62, 81, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "RFDTCT | Door detector with plug connection for the SALTO wireles escutcheon; S | For steel doors; 18 | For wide body escutcheons (Available only in the USA and Canada)"],
  ["AC-SALTO-DOOR-DETECTOR-ESCUTCHEON-RFDTCTW18W01", "SALTO Accessories RFDTCTW18W01", "SALTO", 69.62, 97, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "SALTO RFDTCT Door detector with plug connection for the SALTO wireless escutcheon - for Wood doors.- for wide body escutcheons"],
  ["AC-SALTO-ELEVATOR-FEATURE-SOFTWARE-SPACE-OPT-0035", "SALTO SPACE-OPT-0035", "SALTO", 1533.6, 99, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-PROACCESS-SPACE-03242021.jpg", "SALTO SPACE-OPT-0035 This feature permits you to enable the elevators communication module to mange systems like Schindler PORT protocole. Feature only available individually and is not included in any package.(Available only in the USA and Canada)"],
  ["AC-SALTO-EMERGENCY-POWER-SUPPLY-EPS100", "SALTO EPS100", "SALTO", 68.57, 134, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-EPS100-03242021.png", "Emergency Power Supply|PPD connection cord; battery harness|requires 4 AA batteries (Available only in the USA and Canada)"],
  ["AC-SALTO-ENCODER-DESFIRE-EC904B0US", "SALTO EC904B0US", "SALTO", 1328.28, 147, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-ENCODER-03242021.png", "SALTO NCoder - Proximity card encoder Mifare/DESFire. USB and Ethernet connections. DHCP addressing. Desktop reader capabilities (Bluetooth mobile keys not supported)(Available only in the USA and Canada)"],
  ["AC-SALTO-ENCODER-DESFIRE-ECB04B0US", "SALTO ECB04B0US", "SALTO", 1992.35, 73, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-ENCODER-03242021.png", "Encoder|BLE|DESFire|Mifare|ethernet; USB|can be used as desktop reader (Available only in the USA and Canada)"],
  ["AC-SALTO-EXPANSION-UNIT-RS485-NOCOVER-CU4EB8US", "SALTO CU4EB8US", "SALTO", 908.7, 141, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/XS4_CU4EB8_2-081812021.png", "Expansion Unit|XS4 2.0|4 in|8 out|RS485 auxillary; exp of CU42xx|12VDC xfmr|No enclosure (Available only in the USA and Canada)"],
  ["AC-SALTO-MOBILE-USER-LICENSE-SPACE-OPT-0016-1", "SALTO SPACE-OPT-0016-1", "SALTO", 4.73, 95, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-PROACCESS-SPACE-03242021.jpg", "SALTO ProAccess SPACE; SPACE Mobile Users License (0016-1); included for first 12 months from software registration; billed annually therafter - Requires Annual Subscription Renewal (0028-2) (Available only in the USA and Canada)"],
  ["AC-SALTO-PORTABLE-PROGRAMMING-DEVICE-PPD800", "SALTO PPD800", "SALTO", 1194.76, 161, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-XS4-PPD800-03242021.jpg", "Portable Programming Device|NFC|USB connection; 3 pin harness connector|req 3 AAA batteries; incl (Available only in the USA and Canada)"],
  ["AC-SALTO-PROACCESS-SPACE-SOFTWARE-SPACE-OPT-0032", "SALTO SPACE-OPT-0032", "SALTO", 1533.6, 153, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-PROACCESS-SPACE-03242021.jpg", "SALTO ProAccess SPACE software SPACE-OPT-0032; SALTO event-alarms & communication module. Enables event alarms and also sends emails to the operators generated by the events. (Available only in the USA and Canada)"],
  ["AC-SALTO-PROACCESS-SPACE-SOFTWARE-SPAONLINE", "SALTO SPAONLINE", "SALTO", 2180.34, 159, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-PROACCESS-SPACE-03242021.jpg", "SALTO ProAccess SPACE; ProAccess SPACE Software |Online|SVN|RF|Lockdown; Event Stream|Automatic Key Assignment|Less Photo (Available only in the USA and Canada)"],
  ["AC-SALTO-PROACCESS-SPACE-SOFTWARE-SPAPART", "SALTO SPAPART", "SALTO", 5263.97, 139, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-PROACCESS-SPACE-03242021.jpg", "SALTO ProAccess SPACE software Partitional package that includes: - All the features included in the SALTO ProAccess SPACE ID System package - Partitional functionalities (department operator) (Available only in the USA and Canada)"],
  ["AC-SALTO-SAMKIT9", "SALTO SAMKIT9", "SALTO", 21667.08, 123, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-PROACCESS-SPACE-03242021.jpg", "Salto Authorization Module(SAM)|DESFire|EndUser; requires EC9xx|application subject to approval; SAM Software Kit. Includes SAM Software; SAM card. (Available only in the USA and Canada)"],
  ["AC-SALTO-SAMKITH", "SALTO SAMKITH", "SALTO", 21667.08, 98, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-PROACCESS-SPACE-03242021.jpg", "Salto Authorization Module(SAM)|HID iClass|EndUser; requires ECHxx|application subject to approval; SAM Software Kit. Includes SAM Software; SAM card. (Available only in the USA and Canada)"],
  ["AC-SALTO-SHIP-OPTION-SPACE-OPT-0018", "SALTO SPACE-OPT-0018", "SALTO", 613.5, 127, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-PROACCESS-SPACE-03242021.jpg", "SALTO ProAccess SPACE; SPACE SHIP Interface Option (0018) (Available only in the USA and Canada)"],
  ["AC-SALTO-UPDATER-KIT-UBOX42DBABTUS", "Salto UBOX42DBABTUS", "SALTO", 945.54, 145, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/UBOX4000-081812021.png", "The UBOX4000 offers a compact solution updater kit based on a SALTO Controller and a Wall Reader that permits to integrate with third party products. ANSI - North American - Single gang mount reader; Black; Transparent Cover; US version; Includes UBOX 42 controller in a case with translucent cover and black ANSI rectangular BLE Mifare DESFire reader. (Available only in the USA and Canada)"],
  ["AC-SALTO-UPDATER-KIT-UBOX42DBMBTUS", "Salto UBOX42DBMBTUS", "SALTO", 945.54, 105, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/UBOX4000-081812021.png", "The UBOX4000 offers a compact solution updater kit based on a SALTO Controller and a Wall Reader that permits to integrate with third party products. Mullion - narrow reader; Black; Transparent Cover; US version; Includes UBOX 42 controller in a case with translucent cover and black mullion BLE Mifare DESFire reader. (Available only in the USA and Canada)"],
  ["AC-SALTO-WIRELESS-NODE-BLUENET-RFNODE3", "SALTO RFNODE3", "SALTO", 195.2, 173, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-RFNODE-BLUENET-03242021.png", "Wireless Node|BLUEnet|white; Wired|requires GATEWAYxx for operation (Available only in the USA and Canada)"],
  ["AC-SALTO-WIRELESS-OPTION-BLUENET-SPACE-OPT-0033", "SALTO SPACE-OPT-0033", "SALTO", 185.08, 181, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-PROACCESS-SPACE-03242021.jpg", "SALTO ProAccess SPACE; SPACE BLUEnet Wireless Connection Option (0033); 1ea per Lockset (online)"],
  ["AC-SALTO-WIRELESS-OPTION-RF-SPACE-OPT-0021", "SALTO SPACE-OPT-0021", "SALTO", 146.28, 70, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-PROACCESS-SPACE-03242021.jpg", "SALTO ProAccess SPACE; SPACE Wireless Option (0021)|enables RF (Available only in the USA and Canada)"],
  ["AC-SALTO-WIRELESS-REPEATER-BLUENET-REPEATER03US", "SALTO REPEATER03US", "SALTO", 195.2, 167, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-WIRELESS-REPEATER-WHITE-03242021.png", "Wireless Repeater|BLUEnet|white; Wired|requires GATEWAYx3 or RFNODE3 for operation (Available only in the USA and Canada)"],
  ["AC-SALTO-WRDM0A4B", "Salto Wall Reader Mifare BLE HSE ANSI (standard) Black", "SALTO", 740.51, 173, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Salto Wall Reader Mifare BLE HSE ANSI (standard) Black"],
  ["AC-SALTO-WRDM0A4W", "Salto Wall Reader Mifare BLE HSE ANSI (standard) White", "SALTO", 740.51, 90, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg", "Salto Wall Reader Mifare BLE HSE ANSI (standard) White"],
  ["AC-SALTO-WRDM0M4B", "Salto Wall Reader Mifare BLE HSE Mullion Black", "SALTO", 740.51, 159, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg", "Salto Wall Reader Mifare BLE HSE Mullion Black"],
  ["AC-SALTO-XS4-OP-PANIC-BAR-KIT-CR-KPP17IM", "SALTO KPP17IM", "SALTO", 456.19, 124, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "SALTO XS4 Original + PB Kit| Corbin Russwin ED2500 & Yale 7100 | SVN|satin stainless (Available only in the USA and Canada)"],
  ["AC-SALTO-XS4-OP-PANIC-BAR-KIT-DK-KPP55IM", "SALTO KPP55IM", "SALTO", 456.19, 113, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "SALTO XS4 Original + PB Kit | Dorma Kabba | SVN|satin stainless (Available only in the USA and Canada)"],
  ["AC-SALTO-XS4-OP-PANIC-BAR-KIT-SAR-KPP08IM", "SALTO KPP08IM", "SALTO", 456.19, 105, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "SALTO XS4 Original +PB Kit| SARGENT 8888 | SVN|satin stainless (Available only in the USA and Canada)"],
  ["AC-SALTO-XS4-OP-WB-ESCUTCHEON-ANSI-AM666G00IMB38", "SALTO AM666G00IMB38", "SALTO", 1301.66, 89, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-XS4-ESCUTION-ANSI-03242021.jpg", "SALTO XS4 Electronic Escutcheon Ax666; For ANSI mortise locks; 2 handles; any type; electronic do not disturb system; built in mechanical cylinder with audit housing; (mechanical cylinder not included). Technology: Mifare + Bluetooth LE + HSE; finishes and handles.(Available only in the USA and Canada)"],
  ["AC-SALTO-XS4-PB-KIT-CR-KPB17IM", "SALTO KPB17IM", "SALTO", 456.19, 97, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "XS4 PB Kit|Corbin Russwin ED2500 & Yale 7100 - SVN|satin stainless (Available only in the USA and Canada)"],
  ["AC-SALTO-XS4-PB-KIT-SG-KPB08IM", "SALTO KPB08IM", "SALTO", 456.19, 167, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "XS4 PB Kit| SARGENT 8888 - SVN|satin stainless (Available only in the USA and Canada)"],
  ["AC-SALTO-XS4-PB-KIT-VD-KPB03IM", "SALTO KPB03IM", "SALTO", 456.19, 113, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "XS4 PB Kit|Salto PBF110|Von Duprin series 98 & 99 - SVN|satin stainless (Available only in the USA and Canada)"],
  ["AC-SALTO-XS4-PB-KIT-VD-KPB04IM", "SALTO KPB04IM", "SALTO", 456.19, 83, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "XS4 PB Kit|Von Duprin series 98/9927 & 98/9957 - SVN|satin stainless (Available only in the USA and Canada)"],
  ["AC-HID-EL-DYMO-30856", "HID EL-DYMO-30856", "HID", 98.64, 81, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/EL-DYMO-30856-Lbl_08212020.jpg", "DYMO 30856 non-adhesive badges (250)(HID Part Number: EL-DYMO-30856)"],
  ["AC-HID-EL-DYMO-30911", "HID EL-DYMO-30911", "HID", 169.1, 118, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/EL-DYMO-30911-Lbl_08212020.jpg", "DYMO 30911 adhesive self-expiring badges (250)(HID Part Number: EL-DYMO-30911)"],
  ["AC-HID-EL-K12-SVM", "HID EL-K12-SVM", "HID", 3228.92, 82, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/easylobby-dvd-case-mockup_08212020.jpg", "1 copy of SVM software; includes Free Administrator software (admin/reporting) Special bundle package for K-12 schools only (HID # EL-K12-SVM)(HID Part Number: EL-K12-SVM)"],
  ["AC-SAFR-ACCS-SFR-SCEXWAR-2YR", "AC-SAFR-ACCS-SFR-SCEXWAR-2YR", "Accessories", 552.7, 115, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg", ""],
  ["AC-SAFR-ACCS-SFR-SCFMA-100", "AC-SAFR-ACCS-SFR-SCFMA-100", "Accessories", 236.08, 178, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg", ""],
  ["AC-SAFR-ACCS-SFR-SCWDG-20", "AC-SAFR-ACCS-SFR-SCWDG-20", "Accessories", 127.76, 114, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg", ""],
  ["AC-SAFR-RDR-SFR-SC100", "AC-SAFR-RDR-SFR-SC100", "Accessories", 2785.73, 147, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg", ""],
  ["AC-SW-ACM-DEMO-30D-6-P", "Access Control Manager 6 30 Day Demo License", "Accessories", 0, 103, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 License 30 Day Demonstration: includes licensing for  Badging; Exacq; Milestone; one Bosch intrusion panel; ViRIDI BEManager integration; Replication; Hot Stand By Auto Failover; SQL collaboration; Oracle collaboration; LDAP collaboration; XML collaboration; REST collaboration"],
  ["AC-SW-LIC-16RCU-6-P", "Access Control Manager 6 Sixteen Doors Expansion Software Licenses", "Accessories", 3060, 173, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Additional 16 Doors Expansion Software Licenses for Avigilon Access Control Manager Professional; Enterprise; Enterprise Plus & Virtual"],
  ["AC-SW-LIC-AF-6-P", "Access Control Manager 6 Auto Failover License (per appliance)", "Accessories", 6548.4, 75, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 Hot Standby - Auto Failover Software License (per Appliance) includes AC-SW-LIC-REP-6-P; Requires duplicate licensing for failover appliance"],
  ["AC-SW-LIC-BDGE-6-P", "Access Control Manager 6 Badging Software Licenses", "Accessories", 1090.97, 163, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Badging Software Licenses for Avigilon Access Control Manager Professional; Enterprise; Enterprise Plus & Virtual"],
  ["AC-SW-LIC-PART-6-P", "Access Control Manager 6 Partitioning License for additional partitions", "Accessories", 5457.43, 128, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 Partitioning License for additional partitions (per appliance)"],
  ["AC-SW-LIC-REP-6-P", "Access Control Manager 6 Replication License (per appliance)", "Accessories", 4365.17, 138, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 Multi-Appliance Replication Software License (per appliance)"],
  ["AC-SW-LIC-REST-6-P", "Access Control Manager 6 REST Connectivity Software License", "Accessories", 1090.97, 85, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 REST Connectivity Software License (per appliance)"],
  ["AC-SW-LIC-WIRELESS-LOCK-6-P", "Access Control Manager 6 Wireless Lock Connectivity Software License", "Accessories", 240, 118, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 Wireless Lock Connectivity Software License for each wireless locks not purchased from Motorola Solutions"],
  ["UA-SW-LIC-1000DOORS", "UA7 1000 Door License", "UA7", 120000, 80, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "UA7 1000 Door License"],
  ["UA-SW-LIC-100DOORS", "UA7 100 Door License", "UA7", 16080, 140, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "UA7 100 Door License"],
  ["UA-SW-LIC-10DOORS", "UA7 10 Door License", "UA7", 1980, 107, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg", "UA7 10 Door License"],
  ["UA-SW-LIC-1DOORS", "UA7 1 Door License", "UA7", 240, 176, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "UA7 1 Door License"],
  ["UA-SW-LIC-ALL-IN-ADDON", "UA7 All-in Add-on", "UA7", 7200, 150, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Includes the Availability & Network; Situational Awareness; Data & Templates; and Integrations Add-on"],
  ["UA-SW-LIC-AVAILABILITY-ADDON", "UA7 Availability and Network Add-on", "UA7", 2400, 149, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "UA7 Availability and Network Add-on"],
  ["UA-SW-LIC-AWARENESS-ADDON", "UA7 Situational Awareness Add-on", "UA7", 2400, 183, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "UA7 Situational Awareness Add-on"],
  ["UA-SW-LIC-BASE-PACK", "UA7 Base Package License (includes 20 doors)", "UA7", 4800, 180, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg", "UA7 Base Package License (includes 20 doors)"],
  ["UA-SW-LIC-DATA-ADDON", "UA7 Data and Templates Add-on", "UA7", 3000, 116, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "UA7 Data and Templates Add-on"],
  ["UA-SW-LIC-INTEGRATIONS-ADDON", "UA7 Integrations Add-on", "UA7", 2400, 143, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "UA7 Integrations Add-on"],
  ["UA-SW-LIC-SERVICE-PLAN-1000-1Y", "UA7 Service Plan for up to 1000 doors; 1 Year", "UA7", 3000, 94, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "UA7 Service Plan for up to 1000 doors; 1 Year"],
  ["UA-SW-LIC-SERVICE-PLAN-1000-3Y", "UA7 Service Plan for up to 1000 doors; 3 Years", "UA7", 9000, 160, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "UA7 Service Plan for up to 1000 doors; 3 Years"],
  ["UA-SW-LIC-SERVICE-PLAN-1000-5Y", "UA7 Service Plan for up to 1000 doors; 5 Years", "UA7", 15000, 78, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "UA7 Service Plan for up to 1000 doors; 5 Years"],
  ["UA-SW-LIC-SERVICE-PLAN-2000-1Y", "UA7 Service Plan for up to 2000 doors; 1 Year", "UA7", 5520, 75, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "UA7 Service Plan for up to 2000 doors; 1 Year"],
  ["UA-SW-LIC-SERVICE-PLAN-2000-3Y", "UA7 Service Plan for up to 2000 doors; 3 Years", "UA7", 16560, 154, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "UA7 Service Plan for up to 2000 doors; 3 Years"],
  ["UA-SW-LIC-SERVICE-PLAN-2000-5Y", "UA7 Service Plan for up to 2000 doors; 5 Years", "UA7", 27600, 99, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "UA7 Service Plan for up to 2000 doors; 5 Years"],
  ["UA-SW-LIC-SERVICE-PLAN-250-1Y", "UA7 Service Plan for up to 250 doors; 1 Year", "UA7", 900, 168, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "UA7 Service Plan for up to 250 doors; 1 Year"],
  ["UA-SW-LIC-SERVICE-PLAN-250-3Y", "UA7 Service Plan for up to 250 doors; 3 Years", "UA7", 2700, 107, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "UA7 Service Plan for up to 250 doors; 3 Years"],
  ["UA-SW-LIC-SERVICE-PLAN-250-5Y", "UA7 Service Plan for up to 250 doors; 5 Years", "UA7", 4500, 80, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "UA7 Service Plan for up to 250 doors; 5 Years"],
  ["UA-SW-LIC-SERVICE-PLAN-4000-1Y", "UA7 Service Plan for up to 4000 doors; 1 Year", "UA7", 9600, 179, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "UA7 Service Plan for up to 4000 doors; 1 Year"],
  ["UA-SW-LIC-SERVICE-PLAN-4000-3Y", "UA7 Service Plan for up to 4000 doors; 3 Years", "UA7", 28800, 99, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "UA7 Service Plan for up to 4000 doors; 3 Years"],
  ["UA-SW-LIC-SERVICE-PLAN-4000-5Y", "UA7 Service Plan for up to 4000 doors; 5 Years", "UA7", 48000, 180, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "UA7 Service Plan for up to 4000 doors; 5 Years"],
  ["UA-SW-LIC-UPGRADE-PLAN-1000-1Y", "ACM6 to UA7 Upgrade Package for up to 1000 doors (include 1 Year Service Plan)", "UA7", 6000, 82, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "ACM6 to UA7 Upgrade Package for up to 1000 doors (include 1 Year Service Plan)"],
  ["UA-SW-LIC-UPGRADE-PLAN-2000-1Y", "ACM6 to UA7 Upgrade Package for up to 2000 doors (include 1 Year Service Plan)", "UA7", 11040, 118, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "ACM6 to UA7 Upgrade Package for up to 2000 doors (include 1 Year Service Plan)"],
  ["UA-SW-LIC-UPGRADE-PLAN-250-1Y", "ACM6 to UA7 Upgrade Package for up to 250 doors (include 1 Year Service Plan)", "UA7", 1800, 105, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "ACM6 to UA7 Upgrade Package for up to 250 doors (include 1 Year Service Plan)"],
  ["UA-SW-LIC-WIRELESS-LOCK", "Unity Access 7 Outsourced Lock License", "UA7", 240, 128, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Unity Access 7 Outsourced Lock License"],
  ["AC-SW-LIC-LDAP-6-P", "Access Control Manager 6 LDAP Directory Connectivity Software License", "Accessories", 3274.2, 151, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 LDAP Directory Connectivity Software License (required for integration with Microsoft Active Directory or other directory products)(per appliance)"],
  ["AC-SW-LIC-ORCL-6-P", "Access Control Manager 6 Oracle Server Connectivity Software License", "Accessories", 4365.17, 176, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 Oracle Server Connectivity Software License (from Oracle DB 9i forward)(per appliance)"],
  ["AC-SW-LIC-SQL-6-P", "Access Control Manager 6 Microsoft SQL Server Connectivity Software License", "Accessories", 2183.23, 116, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 Microsoft SQL Server Connectivity Software License (from Microsoft SQL 2000 forward)(per appliance)"],
  ["AC-SW-LIC-XML-6-P", "Access Control Manager 6 XML Events Connectivity Software License", "Accessories", 1090.97, 90, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 XML Events Connectivity Software License (per appliance)"],
  ["AC-SW-LIC-ACMEC-MIG-6-P", "Access Control Manager 6 License for the migration of ACM Embedded Controller.", "Accessories", 261.94, 117, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 License for the migration and conversion of a single ACM Embedded Controller into an ACM Professional; Enterprise of Virtual system. One license is required for each ACM Embedded Controller to be migrated. License includes migration of Cardholders into Identities and conversion of the ACM EC into a HID VertX EVO V1000 controller. The ACM system does require the appropriate number of HID licensing (AC-SW-HID-RDR)."],
  ["AC-SW-LIC-BOSCHINTR-10PANEL-6-P", "Access Control Manager 6 Bosch Integration Software Licenses", "Accessories", 3929.04, 115, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Bosch Intrusion (10 Panel) Integration Software Licenses for Avigilon Access Control Manager 6 Professional; Enterprise; Enterprise Plus & Virtual"],
  ["AC-SW-LIC-BOSCHINTR-1PANEL-6-P", "Access Control Manager 6 Bosch Integration Software Licenses", "Accessories", 425.65, 96, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Bosch Intrusion (1 Panel) Integration Software Licenses for Avigilon Access Control Manager 6 Professional; Enterprise; Enterprise Plus & Virtual"],
  ["AC-SW-LIC-DMPINTR-10PANEL-6-P", "Access Control Manager 6 DMP Integration Software Licenses (ten panel)", "Accessories", 3929.04, 155, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 for 10 panel license for DMP intrusion panel integration. Panels supported: XR150 & XR550 Command Processor Intrusion Panels"],
  ["AC-SW-LIC-DMPINTR-1PANEL-6-P", "Access Control Manager 6 DMP Integration Software Licenses (one panel)", "Accessories", 425.65, 104, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 per panel license (one panel) for DMP intrusion panel integration. Panels supported: XR150 & XR550 Command Processor Intrusion Panels"],
  ["AC-SW-LIC-HID-VERTX-ASM-6-P", "Access Control Manager 6 NON OEM HID VertX EVO Assimilation License", "HID", 654.84, 159, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 NON OEM (Non Avigilon Ordered) HID VertX EVO V1000 or HID VertX EVO V2000 Assimilation License (One required per VertX EVO Controller)"],
  ["AC-SW-LIC-VIRDI-BIO-6-P", "Access Control Manager 6 ViRDI Integration Software Licenses", "Accessories", 3274.2, 157, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "ViRDI BE Manager Integration Software Licenses for Avigilon Access Control Manager 6 Professional; Enterprise; Enterprise Plus & Virtual"],
  ["AC-SW-LIC-EXACQ-6-P", "Access Control Manager 6 License for Video Integration for Exacq", "Accessories", 5456.12, 152, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 License for Video Integration for Exacq (per appliance)"],
  ["AC-SW-LIC-MILEST-6-P", "Access Control Manager 6 License for Video Integration for Milestone", "Accessories", 5456.12, 79, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 License for Video Integration for Milestone (per appliance)"],
  ["AC-SW-LIC-AVO-VER-16VS-6-P", "Access Control Manager 6 (ACM) Verify license for 16 virtual stations", "Accessories", 1090.97, 147, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 (ACM) Verify license for 16 virtual stations (per appliance)"],
  ["AC-SW-LIC-AVO-VER-5VS-6-P", "Access Control Manager 6 (ACM) Verify license for 5 virtual stations", "Accessories", 392.9, 151, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 (ACM) Verify license for 5 virtual stations (per appliance)"],
  ["AC-APP-ENT2-WARR-EXTEND-1YR", "1 Year Extended Warranty for Access Control Manager Enterprise Appliance", "Accessories", 880.1, 91, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/ACM-Enterprise-Appliance-240-front-angle-7in_070820.jpg", "1 Year Extended Warranty for Access Control Manager Enterprise Appliance"],
  ["AC-APP-ENT2-WARR-EXTEND-2YR", "2 Year Extended Warranty for Access Control Manager Enterprise Appliance", "Accessories", 1760.21, 138, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/ACM-Enterprise-Appliance-240-front-angle-7in_070820.jpg", "2 Year Extended Warranty for Access Control Manager Enterprise Appliance"],
  ["UA-APP-ENT-7", "UA7 Enterprise Appliance", "UA7", 10710, 163, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/ACM-Enterprise-Appliance-240-front-angle-7in_070820.jpg", "UA7 Enterprise Appliance"],
  ["UA-APP-ENT-WARR-EXTEND-1YR", "1 Year Extended Warranty for UA Enterprise Appliance", "UA7", 880.1, 101, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/ACM-Enterprise-Appliance-240-front-angle-7in_070820.jpg", "1 Year Extended Warranty for UA Enterprise Appliance"],
  ["UA-APP-ENT-WARR-EXTEND-2YR", "2 Year Extended Warranty for UA Enterprise Appliance", "UA7", 1760.21, 90, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/ACM-Enterprise-Appliance-240-front-angle-7in_070820.jpg", "2 Year Extended Warranty for UA Enterprise Appliance"],
  ["AC-APP-ENT-PLUS-WARR-EXTEND-1YR", "1 Year Extended Warranty for Access Control Manager Enterprise Plus Appliance", "Accessories", 1038.25, 129, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/ACM-Enterprise-Plus-Appliance-340-front-angle-7in_070820.jpg", "1 Year Extended Warranty for Access Control Manager Enterprise Plus Appliance"],
  ["AC-APP-ENT-PLUS-WARR-EXTEND-2YR", "2 Year Extended Warranty for Access Control Manager Enterprise Plus Appliance", "Accessories", 2083.37, 118, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/ACM-Enterprise-Plus-Appliance-340-front-angle-7in_070820.jpg", "2 Year Extended Warranty for Access Control Manager Enterprise Plus Appliance"],
  ["UA-APP-ENT-PLUS-7", "UA7 Enterprise Plus Appliance", "UA7", 25704, 104, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/ACM-Enterprise-Appliance-240-front-angle-7in_070820.jpg", "UA7 Enterprise Plus Appliance"],
  ["UA-APP-ENT-PLUS-WARR-EXTEND-1YR", "1 Year Extended Warranty for UA Enterprise Plus Appliance", "UA7", 1038.25, 151, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/ACM-Enterprise-Plus-Appliance-340-front-angle-7in_070820.jpg", "1 Year Extended Warranty for UA Enterprise Plus Appliance"],
  ["UA-APP-ENT-PLUS-WARR-EXTEND-2YR", "2 Year Extended Warranty for UA Enterprise Plus Appliance", "UA7", 2083.37, 158, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/ACM-Enterprise-Plus-Appliance-340-front-angle-7in_070820.jpg", "2 Year Extended Warranty for UA Enterprise Plus Appliance"],
  ["AC-APP-PRO-WARR-EXTEND-1YR", "1 Year Extended Warranty for Access Control Manager Professional Appliance", "Accessories", 309.42, 141, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/ACM_Professional-Server_Side-Angle_v3.jpg", "1 Year Extended Warranty for Access Control Manager Professional Appliance"],
  ["AC-APP-PRO-WARR-EXTEND-2YR", "2 Year Extended Warranty for Access Control Manager Professional Appliance", "Accessories", 618.84, 115, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/ACM_Professional-Server_Side-Angle_v3.jpg", "2 Year Extended Warranty for Access Control Manager Professional Appliance"],
  ["UA-APP-PRO-WARR-EXTEND-1YR", "1 Year Extended Warranty for UA Professional Appliance", "UA7", 309.42, 160, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/ACM_Professional-Server_Side-Angle_v3.jpg", "1 Year Extended Warranty for UA Professional Appliance"],
  ["UA-APP-PRO-WARR-EXTEND-2YR", "2 Year Extended Warranty for UA Professional Appliance", "UA7", 618.84, 141, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/ACM_Professional-Server_Side-Angle_v3.jpg", "2 Year Extended Warranty for UA Professional Appliance"],
  ["AC-SW-128R-VM-6-P", "Access Control Manager 6 Virtual Machine License (per 128 readers)", "Accessories", 5456.12, 87, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 Virtual Machine Software License (per 128 Readers)(per appliance)"],
  ["AC-SW-2048R-VM-6-P", "Access Control Manager 6 Virtual Machine License (per 2048 readers)", "Accessories", 87302.26, 104, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 Virtual Machine Software License (per 2048 Readers)(per appliance)"],
  ["AC-SW-256R-VM-6-P", "Access Control Manager 6 Virtual Machine License (per 256 readers)", "Accessories", 10910.97, 117, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 Virtual Machine Software License (per 256 Readers)(per appliance)"],
  ["AC-SW-512R-VM-6-P", "Access Control Manager 6 Virtual Machine License (per 512 readers)", "Accessories", 21822.48, 155, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 Virtual Machine Software License (per 512 Readers)(per appliance)"],
  ["UA-SW-LIC-APP-VIRTUAL-HYPERV", "UA7 Virtual HyperV base pack", "UA7", 4800, 104, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "UA7 Virtual HyperV base pack (includes 20 doors)"],
  ["UA-SW-LIC-APP-VIRTUAL-VMWARE", "UA7 Virtual VMWare base pack", "UA7", 4800, 159, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "UA7 Virtual VMWare base pack (includes 20 doors)"],
  ["AC-MER-A-RES-1K32", "Mercury Resistor 1K 32 pack", "Mercury", 40.16, 157, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Mercury Resistor 1K 32 pack"],
  ["AC-MER-A-TC-MR50", "Mercury Terminal Cover MR50", "Mercury", 15.65, 152, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Mercury Terminal Cover MR50"],
  ["AC-MER-A-TERM5-3", "Mercury Terminal Cover 3 position 5 pack", "Mercury", 18.42, 79, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Mercury Terminal Cover 3 position 5 pack"],
  ["AC-MER-A-TERM5-4", "Mercury Terminal Cover 4 position 5 pack", "Mercury", 18.42, 147, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Mercury Terminal Cover 4 position 5 pack"],
  ["AC-MER-A-TERM5-5", "Mercury Terminal Cover 5 position 5 pack", "Mercury", 18.42, 151, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Mercury Terminal Cover 5 position 5 pack"],
  ["AC-MER-A-TERM5-6", "Mercury Terminal Cover 6 position 5 pack", "Mercury", 18.42, 91, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Mercury Terminal Cover 6 position 5 pack"],
  ["AC-MER-CON-MR16IN", "Mercury Input Control Module MR16IN", "Mercury", 456.66, 138, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/EP1502-top-flat-7in_08212020.jpg", "Input Control Module (16 Inputs) Series 3 (Available only in the USA and Canada)"],
  ["AC-MER-CON-MR16OUT", "Mercury Output Control Module MR16OUT", "Mercury", 522.68, 163, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/EP1502-top-flat-7in_08212020.jpg", "Output Control Module (16 Relays) Series 3 (Available only in the USA and Canada)"],
  ["AC-MER-CON-MR50", "Mercury Reader Interface Module MR50", "Mercury", 318.52, 101, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/EP1502-top-flat-7in_08212020.jpg", "Reader Interface Module (1 Reader; 2 Inputs; 2 Outputs) Series 3 (Available only in the USA and Canada)"],
  ["AC-MER-CON-MR52-S3B", "Mercury Reader Interface Module MR52", "Mercury", 522.68, 90, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/EP1502-top-flat-7in_08212020.jpg", "Reader Interface Module (2 Readers; 8 Inputs; 6 Outputs) Series 3 (Available only in the USA and Canada)"],
  ["AC-MER-CONT-MP1501", "Mercury Intelligent Controller MP1501", "Mercury", 1020.16, 129, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/EP1502-top-flat-7in_08212020.jpg", "Intelligent Controller (2 Readers; 17 Identities/Events; PoE/PoE+; expandable up to 17 readers)"],
  ["AC-MER-CONT-MP1502", "Mercury Intelligent Controller MP1502", "Mercury", 1483.58, 118, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/EP1502-top-flat-7in_08212020.jpg", "Intelligent Controller (2 Readers; 8 Inputs; 4 Outputs; expandable up to 64 readers) (Available only in the USA and Canada)"],
  ["AC-MER-CONT-MP2500", "Mercury Intelligent Controller MP2500", "Mercury", 1653.6, 104, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/EP1502-top-flat-7in_08212020.jpg", "Intelligent Controller (No on-board readers; expandable up to 64 readers)"],
  ["AC-MER-CONT-MP4502", "Mercury Intelligent Controller MP4502", "Mercury", 2418.08, 151, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/EP1502-top-flat-7in_08212020.jpg", "Intelligent Controller (2 Readers; 8 Inputs; 4 Outputs; expandable up to 64 readers; cryptography; high-security)"],
  ["AC-MER-MUX8", "Mercury RS485 Multiplexer MUX8", "Mercury", 362.48, 158, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/EP1502-top-flat-7in_08212020.jpg", "RS485 Multiplexer (1 to 8 RS-485 expansion) (Available only in the USA and Canada)"],
  ["AC-ALL-SCH-FOB-9651", "Allegion Schlage FOB-9651", "Schlage", 9.2, 141, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "9651 credentials; PVC; blank; with Schlage logo; custom formatted (Available only in the USA and Canada)"],
  ["AC-ALL-SCH-FOB-9651T", "Allegion Schlage FOB-9651T", "Schlage", 12.38, 115, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "9651T credentials; key fob; with Schlage logo; custom formatted (Available only in the USA and Canada)"],
  ["AC-ING-CARD-APTIQ-XF7510", "Allegion XF7510 card", "Schlage", 8.73, 160, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "XF7510 credential card; PVC; blank; ISO compliant; custom formatted (Available only in the USA and Canada)"],
  ["AC-ING-CARD-APTIQ-XF8740", "Allegion XF8740 card", "Schlage", 14.73, 141, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "XF8740 credential card; PVC; dual technology (MIFARE; proximity); blank; ISO compliant; custom formatted (Available only in the USA and Canada)"],
  ["AC-ING-CARD-APTIQ-XF9520", "Allegion XF9520 card", "Schlage", 6.3, 87, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "XF9520 credential card; clamshell; proximity; with aptiQ logo; custom formatted (Available only in the USA and Canada)"],
  ["AC-ING-CARD-APTIQ-XF9551", "Allegion XF9551 card", "Schlage", 8.12, 104, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "XF9551 credential card; PVC; proximity; blank; with aptiQ logo; custom formatted (Available only in the USA and Canada)"],
  ["AC-ING-CARD-APTIQ-XF9558", "Allegion XF9558 card", "Schlage", 8.12, 117, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "XF9558 credential card; PVC; proximity; blank; ISO compliant; custom formatted (Available only in the USA and Canada)"],
  ["AC-ING-FOB-APTIQ-XF7610", "Allegion XF7610 FOB", "Schlage", 14.42, 155, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "XF7610 credential key fob; with aptiQ logo; custom formatted (Available only in the USA and Canada)"],
  ["AC-SCH-CARD-8543", "Allegion Schlage 8543", "Schlage", 9.2, 104, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Credential 8543 card; ISO thin; printable; custom formatted (Available only in the USA and Canada)"],
  ["AC-SCH-CARD-8543M1", "Allegion Schlage 8543M1", "Schlage", 11.6, 159, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Credential 8543M1 card; ISO thin; printable; with magnetic stripe; custom formatted (Available only in the USA and Canada)"],
  ["AC-SCH-CARD-CE404033", "Schlage CE404033 smart credential card", "Schlage", 535, 157, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Smart credential card; blank PVC; customized formatting; pack of 100"],
  ["AC-SCH-CARD-MT-8943", "Allegion Schlage MT-8943", "Schlage", 12.38, 152, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Credential MT-8943 card; multi-technology; printable; custom formatted (Available only in the USA and Canada)"],
  ["AC-SCH-FOB-8643T", "Allegion Schlage 8643T FOB", "Schlage", 13.6, 79, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Credential 8643T key fob; custom formatted (Available only in the USA and Canada)"],
  ["AC-SCH-FOB-MT-8843T", "Allegion Schlage MT-8843T", "Schlage", 18.02, 147, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Credential MT-8843T key fob; multi-technology; custom formatted (Available only in the USA and Canada)"],
  ["AC-FP-CARD-CONEKT-CSM-2P", "Farpointe CSM-2P card", "Farpointe", 600, 151, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/Farpointe-Conekt-Mobile-Credential_08172021.jpg", "Farpointe CSM-2P Conekt mobile credential; programmed; ISO thin printable; pack of 100"],
  ["AC-FP-CARD-CSC-2", "Farpointe CSC-2 card", "Farpointe", 530, 91, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Farpointe CSC-2 smartcard; clamshell; slot punch; custom programmed; pack of 100"],
  ["AC-FP-CARD-CSM-2S", "Farpointe CSM-2S card", "Farpointe", 720, 138, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/Farpointe-Conekt-Mobile-Credential_08172021.jpg", "Farpointe CSM-2S Conekt mobile credential; programmed; ISO thin printable; with magnetic stripe; pack of 100"],
  ["AC-FP-CARD-DC1-1", "Farpointe DC1-1 card", "Farpointe", 530, 163, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Farpointe DC1-1 smartcard; clamshell; custom programmed; pack of 100"],
  ["AC-FP-CARD-DC4-1", "Farpointe DC4-1 card", "Farpointe", 530, 101, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Farpointe DC4-1 smartcard; clamshell; slot punch; custom programmed; pack of 100"],
  ["AC-FP-CARD-DE2", "Farpointe DE2 card", "Farpointe", 580, 90, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Farpointe DE2 smartcard; custom programmed; ISO thin printable; pack of 100"],
  ["AC-FP-CARD-DM1-3", "Farpointe DM1-3 card", "Farpointe", 620, 129, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Farpointe DM1-3 smartcard; custom programmed; ISO thin printable; pack of 100"],
  ["AC-FP-CARD-DM1-3S", "Farpointe DM1-3S card", "Farpointe", 720, 118, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Farpointe DM1-3S smartcard; custom programmed; ISO thin printable; with magnetic stripe; pack of 100"],
  ["AC-FP-CARD-DM4-3", "Farpointe DM4-3 card", "Farpointe", 620, 104, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Farpointe DM4-3 smartcard; slot punch; custom programmed; ISO thin printable; pack of 100"],
  ["AC-FP-CARD-DM4-3S", "Farpointe DM4-3S card", "Farpointe", 720, 151, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Farpointe DM4-3S smartcard; slot punch; custom programmed; ISO thin printable; with magnetic stripe; pack of 100"],
  ["AC-FP-CARD-PSC-1-H", "Farpointe PSC-1-H card", "Farpointe", 320, 158, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Farpointe PSC-1-H card; clamshell; custom programmed; H10301 26-Bit format; pack of 100"],
  ["AC-FP-CARD-PSI-4-H", "Farpointe PSI-4-H card", "Farpointe", 530, 141, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Farpointe PSI-4-H card; slot punch; custom programmed; ISO thin printable; H10301 26-Bit format; pack of 100"],
  ["AC-FP-CARD-PSM-2P-H", "Farpointe PSM-2P-H card", "Farpointe", 740, 115, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Farpointe PSM-2P-H card; custom programmed; ISO thin printable; dual technology; H10301 26-Bit format; pack of 100"],
  ["AC-FP-CARD-PSM-2S-H", "Farpointe PSM-2S-H card", "Farpointe", 800, 160, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Farpointe PSM-2S-H card; custom programmed; ISO thin printable; dual technology; with magnetic stripe; H10301 26-Bit format; pack of 100"],
  ["AC-FP-CONEKT-CMC-2-25", "Conekt CMC-2 mobile credential", "Farpointe", 180, 141, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/Farpointe-Conekt-Mobile-Credential_08172021.jpg", "Farpointe Conekt mobile credential; custom programmed; pack of 25"],
  ["AC-FP-FOB-CSK-2", "Farpointe CSK-2 FOB", "Farpointe", 740, 87, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Farpointe CSK-2 smartcard key fob; custom programmed; pack of 100"],
  ["AC-FP-FOB-DK1-3", "Farpointe DK1-3 FOB", "Farpointe", 740, 104, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Farpointe DK1-3 smartcard key fob; custom programmed; pack of 100"],
  ["AC-FP-FOB-DK4-3", "Farpointe DK4-3 FOB", "Farpointe", 740, 117, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Farpointe DK4-3 smartcard key fob; custom programmed; pack of 100"],
  ["AC-FP-TAG-PDT-1-H", "Farpointe PDT-1-H disk transmitter", "Farpointe", 160, 155, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Farpointe PDT-1-H disk transmitter tag; proximity; custom programmed; adhesive back; H10301 26-Bit format; pack of 25"],
  ["AC-FP-TAG-PSK-3-H", "Farpointe PSK-3-H key tag", "Farpointe", 620, 104, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Farpointe PSK-3-H key tag; custom programmed; H10301 26-Bit format; pack of 100"],
  ["AC-FP-TRANS-LONG-RANGE-WRT-2+D2", "Farpointe WRT-2+D2 transmitter", "Farpointe", 250, 159, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/Farpointe-Ranger-Transmitter_08172021.jpg", "Farpointe WRT-2+D2 long range transmitter; custom programmed; dual button; with integrated DESFire EV1 smartcard; pack of 10"],
  ["AC-FP-TRANS-LONG-RANGE-WRT-2+S1", "Farpointe WRT-2+S1 transmitter", "Farpointe", 250, 157, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/Farpointe-Ranger-Transmitter_08172021.jpg", "Farpointe WRT-2+S1 long range transmitter; custom programmed; dual button; with integrated smartcard; pack of 10"],
  ["AC-FP-TRANS-LONG-RANGE-WRT-2+S4", "Farpointe WRT-2+S4 transmitter", "Farpointe", 250, 152, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/Farpointe-Ranger-Transmitter_08172021.jpg", "Farpointe WRT-2+S4 long range transmitter; custom programmed; dual button; with integrated smartcard; pack of 10"],
  ["AC-FP-TRANS-LONG-RANGE-WRT-2M", "Farpointe WRT-2M transmitter", "Farpointe", 250, 79, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/Farpointe-Ranger-Transmitter_08172021.jpg", "Farpointe WRT-2M long range transmitter; custom programmed; dual button; with integrated mobile credential; pack of 10"],
  ["AC-FP-TRANS-LONG-RANGE-WRT-4+S4", "Farpointe WRT-4+S4 transmitter", "Farpointe", 260, 147, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/Farpointe-Ranger-Transmitter_08172021.jpg", "Farpointe WRT-4+S4 long range transmitter; custom programmed; four button; with integrated smartcard; pack of 10"],
  ["AC-FP-TRANS-LONG-RANGE-WRT-4+SI", "Farpointe WRT-4+SI transmitter", "Farpointe", 260, 151, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/Farpointe-Ranger-Transmitter_08172021.jpg", "Farpointe WRT-4+SI long range transmitter; custom programmed; four button; with integrated smartcard; pack of 10"],
  ["AC-FP-TRANS-WRT-2+H", "Farpointe WRT-2+H transmitter", "Farpointe", 250, 91, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/Farpointe-Ranger-Transmitter_08172021.jpg", "Farpointe WRT-2+H long range transmitter; custom programmed; dual button; with integrated proximity card; H10301 26-Bit format; pack of 10"],
  ["AC-FP-TRANS-WRT-4+H", "Farpointe WRT-4+H transmitter", "Farpointe", 260, 138, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/Farpointe-Ranger-Transmitter_08172021.jpg", "Farpointe WRT-4+H long range transmitter; custom programmed; four button; with integrated proximity card; H10301 26-Bit format; pack of 10"],
  ["AC-HID-CARD-402221B", "HID 402221B card", "HID", 530, 163, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "HID custom formatted; pack of 100"],
  ["AC-HID-CORP1K-MC-1000", "HID Corporate 1000 configuration fee", "HID", 530, 101, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "HID Corporate 1000 configuration fee; first 1000 cards"],
  ["AC-HID-MOB-MID-SUB-T103", "HID Mobile IDs subscription tier 3", "HID", 9.15, 90, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/HID-Mobile-Credential_08172021.jpg", "HID Mobile IDs subscription; tier 3 (100 to 499 licenses); annual; per user"],
  ["AC-HID-CARD-DUOPROXII-CL", "HID DuoProx II 125 kHz Proximity card", "HID", 1040, 129, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "HID DuoProx II 125 kHz Proximity card with magnetic stripe; blank; custom formatted; pack of 100"],
  ["AC-HID-CARD-ICLASS-2000", "HID iClass Smartcard 2000", "HID", 680, 118, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "HID iCLASS Smartcard 2000; ISO thin printable; 2k bit with 2 application areas; custom formatted; pack of 100"],
  ["AC-HID-CARD-ICLASS-2002", "HID iClass Smartcard 2002", "HID", 810, 104, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "HID iCLASS Smartcard 2002; ISO thin printable; 16k bit with 16 application areas; custom formatted; pack of 100"],
  ["AC-HID-CARD-ICLASS-2004", "HID iClass Smartcard 2004", "HID", 890, 151, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "HID iCLASS Smartcard 2004; ISO thin printable; 32k bit (16k/2+16k/1) with 16 application areas; custom formatted; pack of 100"],
  ["AC-HID-CARD-ICLASS-2050", "HID iClass Key fob 2050", "HID", 1130, 158, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "HID iCLASS Key fob 2050; 2k bit with 2 application areas; custom formatted; pack of 100"],
  ["AC-HID-CARD-ICLASS-2080", "HID iClass Clamshell card 2080", "HID", 530, 141, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "HID iCLASS Clamshell card 2080; 2k bit with 2 application areas; custom formatted; pack of 100"],
  ["AC-HID-CARD-ICLASS-SE-3000", "HID iClass SE Smartcard 3000", "HID", 680, 115, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "HID iCLASS SE Smartcard 3000; ISO thin printable; 2k bit with 2 application areas; custom formatted; pack of 100"],
  ["AC-HID-CARD-ICLASS-SE-3000-AVG", "HID iClass SE Smartcard 3000-AVG", "HID", 680, 160, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "HID iCLASS SE Smartcard 3000; ISO thin printable; 2k bit with 2 application areas; customized formatting; pack of 100"],
  ["AC-HID-CARD-ICLASS-SE-3002", "HID iClass SE Smartcard 3002", "HID", 810, 141, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "HID iCLASS SE Smartcard 3002; ISO thin printable; 16k bit with 16 application areas; custom formatted; pack of 100"],
  ["AC-HID-CARD-ICLASS-SE-3004", "HID iClass SE Smartcard 3004", "HID", 890, 87, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "HID iCLASS SE Smartcard 3004; ISO thin printable; 32k bit (16k/2+16k/1) with 16 application areas; custom formatted; pack of 100"],
  ["AC-HID-CARD-ICLASS-SR-2080", "HID iClass SR Clamshell card 2080", "HID", 530, 104, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "HID iCLASS SR Clamshell card 2080; 2k bit; custom formatted; pack of 100"],
  ["AC-HID-CARD-ISOPROXII-GRPH", "HID ISOProx II 125 kHz Proximity card", "HID", 740, 117, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "HID ISOProx II 125 kHz Proximity card; blank; printable; custom formatted; pack of 100"],
  ["AC-HID-CARD-PROXCARDII-CL", "HID ProxCard II 125 kHz Clamshell card", "HID", 530, 155, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "HID ProxCard II 125 kHz Clamshell card; vertical slot punch; custom formatted; pack of 100"],
  ["AC-HID-CARD-SEOS-5006PGCMN-AVG", "HID Seos Smartcard 5006-AVG", "HID", 900, 104, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "HID Seos Smartcard 5006; customized formatting; pack of 100"],
  ["AC-HID-ELITE-FEE-MC-0036", "HID Elite configuration fee", "HID", 530, 159, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "HID Elite configuration fee; first 1000 cards"],
  ["AC-HID-FOB-ICLASS-3250PNNMN-AVG", "HID iClass Key fob 3250-AVG", "HID", 1130, 157, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "HID iCLASS Key fob 3250; customized formatting; pack of 100"],
  ["AC-HID-FOB-PROXKEYIII-CL", "HID ProxKey III 125 kHz proximity key fob", "HID", 1130, 152, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "HID ProxKey III 125 kHz proximity key fob; custom formatted; pack of 100"],
  ["AC-HID-FOB-SEOS-5266PNNA-AVG", "HID Seos Key fob 5266-AVG", "HID", 1350, 79, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "HID Seos Key fob 5266; customized formatting; pack of 100"],
  ["AC-HID-MOB-MID-SUB-CRD", "HID Mobile IDs subscription cred", "HID", 10.2, 147, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/HID-Mobile-Credential_08172021.jpg", "HID Mobile IDs subscription credit; annual; per user"],
  ["AC-HID-MOB-MID-SUB-T100", "HID Mobile IDs subscription tier 1", "HID", 11.52, 151, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/HID-Mobile-Credential_08172021.jpg", "HID Mobile IDs subscription; tier 1 (20 to 49 licenses); annual; per user"],
  ["AC-HID-MOB-MID-SUB-T100-ADD", "HID Mobile IDs subscription tier 1 add", "HID", 11.52, 91, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/HID-Mobile-Credential_08172021.jpg", "HID Mobile IDs subscription; tier 1 (20 to 49 licenses); annual; per user (add-on license)"],
  ["AC-HID-TAG-MICROPROX-ADH", "HID MicroProx 125 kHz proximity tag", "HID", 1130, 138, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "HID MicroProx 125 kHz proximity tag; adhesive back; custom formatted; pack of 100"],
  ["AC-HID-TAG-PROXPASSII-VEH", "HID ProxPass II active vehicle tag", "HID", 1210, 163, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "HID ProxPass II active vehicle tag; custom formatted; pack of 10"],
  ["AC-STID-CARD-NONPROGRAMED-CCTW870", "STid Architect non-programmed CCTW870 card", "STid", 530, 101, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Architect CCTW870 non-programmed card; MIFARE; PVC; blank printable; pack of 100"],
  ["AC-STID-CARD-NONPROGRAMED-CCTWR70_AP", "STid non-programmed CCTWR70_AP card", "STid", 740, 90, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Non-programmed CCTWR70_AP card; customized formatting; pack of 100"],
  ["AC-STID-CARD-PREPROGRAMED-CCTW870MSI", "STid pre-programmed CCTW870MSI card", "STid", 600, 129, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "CCTW870MSI smartcard; pre-programmed; printable; pack of 100"],
  ["AC-STID-CREDENTIAL-CUSTOM", "STid custom credential card", "STid", 1150, 118, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Architect smartcard; custom printed; pack of 100"],
  ["AC-STID-KEYFOB-NONPROGRAMED-PCGW871", "STid Architect non-programmed PCGW871 fobs", "STid", 135, 104, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/STid-Architect-Reader-with-Keyfobs_08172021.jpg", "Architect PCGW871 non-programmed fobs; black; pack of 10"],
  ["AC-STID-KEYFOB-PREPROGRAMED-PCGW871MSI_AV", "STid pre-programmed PCGW871MSI fobs", "STid", 1350, 151, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/STid-Architect-Reader-with-Keyfobs_08172021.jpg", "PCGW871MSI key fobs; pre-programmed; black; pack of 100"],
  ["AC-STID-MOBILE-CREDENTIAL-CREDIT-BLE-OFFLINE", "STid Architect mobile credential BLE offline credits", "STid", 480, 158, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/STid-Mobile-ID_08172021.jpg", "Architect mobile credential BLE offline credits; minimum order 100; pack of 100"],
  ["AC-STID-MOBILE-CREDENTIAL-CREDIT-BLUE-ONL", "STid mobile credential BLUE online credits", "STid", 480, 141, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/STid-Mobile-ID_08172021.jpg", "Mobile credential BLUE online credits; pack of 100"],
  ["AC-STID-MOBILE-CREDENTIAL-PRES-ADD-CREDIT", "STid Architect mobile ID add credits", "STid", 480, 115, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/STid-Mobile-ID_08172021.jpg", "Architect mobile ID add credits; minimum order 100; pack of 100"],
  ["AC-STID-TAG-UHF-WINDSHIELD-ETA-W90B-574BE10", "STid tag ETA-W90B-574BE10", "STid", 1350, 160, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Architect windshield tag ETA-W90B-574BE10; pre-programmed; pack of 100"],
  ["AC-STID-CARD-CCTW490", "STid Architect CCTW490 card", "STid", 740, 141, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Architect CCTW490 card; ISO thin; printable; custom formatted; pack of 100"],
  ["AC-LSP-16DR-MER", "Accessories 16DR-MER", "LifeSafety Power", 1830, 87, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "16DR-MER controller"],
  ["AC-LSP-16DR-MER-LCK", "Accessories 16DR-MER-LCK", "LifeSafety Power", 2190, 104, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "16DR-MER-LCK controller"],
  ["AC-LSP-2DR-MER", "Accessories 2DR-MER", "LifeSafety Power", 1030, 117, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "2DR-MER controller"],
  ["AC-LSP-2DR-MER-LCK", "Accessories 2DR-MER-LCK", "LifeSafety Power", 1240, 155, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "2DR-MER-LCK controller"],
  ["AC-LSP-4DR-MER", "Accessories 4DR-MER", "LifeSafety Power", 1310, 104, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "4DR-MER controller"],
  ["AC-LSP-4DR-MER-LCK", "Accessories 4DR-MER-LCK", "LifeSafety Power", 1530, 159, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "4DR-MER-LCK controller"],
  ["AC-LSP-8DR-MER", "Accessories 8DR-MER", "LifeSafety Power", 1520, 157, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "8DR-MER controller"],
  ["AC-LSP-8DR-MER-LCK", "Accessories 8DR-MER-LCK", "LifeSafety Power", 1740, 152, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "8DR-MER-LCK controller"],
  ["AC-LSP-B100", "Accessories B100", "LifeSafety Power", 194, 79, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "B100 enclosure"],
  ["AC-LSP-C4", "Accessories C4", "LifeSafety Power", 104, 147, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "C4 enclosure"],
  ["AC-LSP-C8", "Accessories C8", "LifeSafety Power", 114, 151, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "C8 enclosure"],
  ["AC-LSP-D8P", "Accessories D8P", "LifeSafety Power", 124, 91, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "D8P enclosure"],
  ["AC-LSP-E1M", "Accessories E1M", "LifeSafety Power", 104, 138, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "E1M enclosure"],
  ["AC-LSP-E2-BOXED", "Accessories E2-BOXED", "LifeSafety Power", 254, 163, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "E2-BOXED enclosure"],
  ["AC-LSP-E2-BS1", "Accessories E2-BS1", "LifeSafety Power", 364, 101, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "E2-BS1 enclosure"],
  ["AC-LSP-E2M", "Accessories E2M", "LifeSafety Power", 114, 90, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "E2M enclosure"],
  ["AC-LSP-E4-3BS1", "Accessories E4-3BS1", "LifeSafety Power", 404, 129, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "E4-3BS1 enclosure"],
  ["AC-LSP-E4M", "Accessories E4M", "LifeSafety Power", 134, 118, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "E4M enclosure"],
  ["AC-LSP-E4M1", "Accessories E4M1", "LifeSafety Power", 104, 81, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "E4M1 enclosure"],
  ["AC-LSP-E4V", "Accessories E4V", "LifeSafety Power", 164, 105, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "E4V enclosure"],
  ["AC-LSP-E4V1", "Accessories E4V1", "LifeSafety Power", 104, 173, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "E4V1 enclosure"],
  ["AC-LSP-E6M-BOXED", "Accessories E6M-BOXED", "LifeSafety Power", 354, 181, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "E6M-BOXED enclosure"],
  ["AC-LSP-E6M1-BOXED", "Accessories E6M1-BOXED", "LifeSafety Power", 354, 70, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "E6M1-BOXED enclosure"],
  ["AC-LSP-E8M-BOXED", "Accessories E8M-BOXED", "LifeSafety Power", 384, 167, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "E8M-BOXED enclosure"],
  ["AC-LSP-E8M2-BOXED", "Accessories E8M2-BOXED", "LifeSafety Power", 384, 173, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "E8M2-BOXED enclosure"],
  ["AC-LSP-EPLT-1M", "Accessories EPLT-1M", "LifeSafety Power", 84, 90, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "EPLT-1M enclosure"],
  ["AC-LSP-F8", "Accessories F8", "LifeSafety Power", 114, 159, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "F8 enclosure"],
  ["AC-LSP-F8P", "Accessories F8P", "LifeSafety Power", 124, 124, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "F8P enclosure"],
  ["AC-LSP-FPO150", "Accessories FPO150", "LifeSafety Power", 314, 113, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO150 enclosure"],
  ["AC-LSP-FPO150-8DR-DV", "Accessories FPO150-8DR-DV", "LifeSafety Power", 1310, 105, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO150-8DR-DV controller"],
  ["AC-LSP-FPO150-8DR-SV", "Accessories FPO150-8DR-SV", "LifeSafety Power", 1150, 89, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO150-8DR-SV controller"],
  ["AC-LSP-FPO150-B1002D8PM8NL4E4M/T8-C", "Accessories FPO150-B1002D8PM8NL4E4M/T8-C", "LifeSafety Power", 1410, 97, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO150-B1002D8PM8NL4E4M/T8-C controller"],
  ["AC-LSP-FPO150-B1002D8PM8NL4E4M1-P8-A", "Accessories FPO150-B1002D8PM8NL4E4M1-P8-A", "LifeSafety Power", 1410, 167, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO150-B1002D8PM8NL4E4M1-P8-A controller"],
  ["AC-LSP-FPO150-B100C82D8PE4M-T8-A", "Accessories FPO150-B100C82D8PE4M-T8-A", "LifeSafety Power", 1530, 113, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO150-B100C82D8PE4M-T8-A controller"],
  ["AC-LSP-FPO150-B100C8D8E4-4SL1", "Accessories FPO150-B100C8D8E4-4SL1", "LifeSafety Power", 1310, 83, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO150-B100C8D8E4-4SL1 controller"],
  ["AC-LSP-FPO150-B100C8D8NL4E4M", "Accessories FPO150-B100C8D8NL4E4M", "LifeSafety Power", 1520, 81, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO150-B100C8D8NL4E4M controller"],
  ["AC-LSP-FPO150-B100C8P2D8PE4M-T8-A", "Accessories FPO150-B100C8P2D8PE4M-T8-A", "LifeSafety Power", 1530, 118, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO150-B100C8P2D8PE4M-T8-A controller"],
  ["AC-LSP-FPO150-B100D8M8NL4E4-4SL1", "Accessories FPO150-B100D8M8NL4E4-4SL1", "LifeSafety Power", 1310, 82, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO150-B100D8M8NL4E4-4SL1 controller"],
  ["AC-LSP-FPO150-B100D8PM8NL4E4M", "Accessories FPO150-B100D8PM8NL4E4M", "LifeSafety Power", 1520, 115, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO150-B100D8PM8NL4E4M controller"],
  ["AC-LSP-FPO150-B100D8PM8NL4E6M", "Accessories FPO150-B100D8PM8NL4E6M", "LifeSafety Power", 1520, 178, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO150-B100D8PM8NL4E6M controller"],
  ["AC-LSP-FPO150-PS", "Accessories FPO150-PS", "LifeSafety Power", 254, 114, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO150-PS enclosure"],
  ["AC-LSP-FPO150/150-16DR-DV", "Accessories FPO150/150-16DR-DV", "LifeSafety Power", 2190, 147, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO150/150-16DR-DV controller"],
  ["AC-LSP-FPO150/250-2D82M8NL4E6M1", "Accessories FPO150/250-2D82M8NL4E6M1", "LifeSafety Power", 2540, 103, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO150/250-2D82M8NL4E6M1 controller"],
  ["AC-LSP-FPO150/250-2D8P2M8NL4E4M1", "Accessories FPO150/250-2D8P2M8NL4E4M1", "LifeSafety Power", 2540, 173, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO150/250-2D8P2M8NL4E4M1 controller"],
  ["AC-LSP-FPO150/250-2D8P2M8NL4E6M1", "Accessories FPO150/250-2D8P2M8NL4E6M1", "LifeSafety Power", 2540, 75, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO150/250-2D8P2M8NL4E6M1 controller"],
  ["AC-LSP-FPO150/250-2D8P2M8NL4E8M2", "Accessories FPO150/250-2D8P2M8NL4E8M2", "LifeSafety Power", 2540, 163, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO150/250-2D8P2M8NL4E8M2 controller"],
  ["AC-LSP-FPO150/250-3D8P2M8NL4E4M1/T16-A", "Accessories FPO150/250-3D8P2M8NL4E4M1/T16-A", "LifeSafety Power", 2540, 128, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO150/250-3D8P2M8NL4E4M1/T16-A controller"],
  ["AC-LSP-FPO150/250-3D8P2M8NL4E4M1/T16-C", "Accessories FPO150/250-3D8P2M8NL4E4M1/T16-C", "LifeSafety Power", 2540, 138, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO150/250-3D8P2M8NL4E4M1/T16-C controller"],
  ["AC-LSP-FPO150/250-3D8P2M8NL4E8M2/P16-B", "Accessories FPO150/250-3D8P2M8NL4E8M2/P16-B", "LifeSafety Power", 2540, 85, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO150/250-3D8P2M8NL4E8M2/P16-B controller"],
  ["AC-LSP-FPO250", "Accessories FPO250", "LifeSafety Power", 364, 118, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO250 enclosure"],
  ["AC-LSP-FPO250-16DR-SV", "Accessories FPO250-16DR-SV", "LifeSafety Power", 2190, 80, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO250-16DR-SV controller"],
  ["AC-LSP-FPO250-2M8PNL4E4M", "Accessories FPO250-2M8PNL4E4M", "LifeSafety Power", 1520, 140, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO250-2M8PNL4E4M controller"],
  ["AC-LSP-FPO250-B100D8PM8NL4E6M", "Accessories FPO250-B100D8PM8NL4E6M", "LifeSafety Power", 1520, 107, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO250-B100D8PM8NL4E6M controller"],
  ["AC-LSP-FPO250-M8PNL4E4M-NU02", "Accessories FPO250-M8PNL4E4M-NU02", "LifeSafety Power", 1520, 176, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO250-M8PNL4E4M-NU02 controller"],
  ["AC-LSP-FPO250/250-16DR-DV", "Accessories FPO250/250-16DR-DV", "LifeSafety Power", 2190, 150, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO250/250-16DR-DV controller"],
  ["AC-LSP-FPO250/250-3C85D8PE12M/T24-A", "Accessories FPO250/250-3C85D8PE12M/T24-A", "LifeSafety Power", 2540, 149, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO250/250-3C85D8PE12M/T24-A controller"],
  ["AC-LSP-FPO250/250-4M8PNLXE8M2-NU01", "Accessories FPO250/250-4M8PNLXE8M2-NU01", "LifeSafety Power", 2540, 183, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO250/250-4M8PNLXE8M2-NU01 controller"],
  ["AC-LSP-FPO250/250-NLXE4M", "Accessories FPO250/250-NLXE4M", "LifeSafety Power", 2540, 180, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO250/250-NLXE4M controller"],
  ["AC-LSP-FPO250/250-NLXE8M2", "Accessories FPO250/250-NLXE8M2", "LifeSafety Power", 2540, 116, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO250/250-NLXE8M2 controller"],
  ["AC-LSP-FPO75", "Accessories FPO75", "LifeSafety Power", 254, 143, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO75 enclosure"],
  ["AC-LSP-FPO75-2D8E2-5SL1", "Accessories FPO75-2D8E2-5SL1", "LifeSafety Power", 1030, 94, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO75-2D8E2-5SL1 controller"],
  ["AC-LSP-FPO75-4DR-SV", "Accessories FPO75-4DR-SV", "LifeSafety Power", 1150, 160, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO75-4DR-SV controller"],
  ["AC-LSP-FPO75-B100C4D8NL4E2M", "Accessories FPO75-B100C4D8NL4E2M", "LifeSafety Power", 1240, 78, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO75-B100C4D8NL4E2M controller"],
  ["AC-LSP-FPO75-B100C4E1-2SL1", "Accessories FPO75-B100C4E1-2SL1", "LifeSafety Power", 1030, 75, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO75-B100C4E1-2SL1 controller"],
  ["AC-LSP-FPO75-B100C8D8E2-3SL1", "Accessories FPO75-B100C8D8E2-3SL1", "LifeSafety Power", 1150, 154, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO75-B100C8D8E2-3SL1 controller"],
  ["AC-LSP-FPO75-B100M8NL4E2M", "Accessories FPO75-B100M8NL4E2M", "LifeSafety Power", 1240, 99, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO75-B100M8NL4E2M controller"],
  ["AC-LSP-FPO75-B100M8PNL4E2M-WP-FCS04", "Accessories FPO75-B100M8PNL4E2M-WP-FCS04", "LifeSafety Power", 1240, 168, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO75-B100M8PNL4E2M-WP-FCS04 controller"],
  ["AC-LSP-FPO75-D8E1-2SL1", "Accessories FPO75-D8E1-2SL1", "LifeSafety Power", 1030, 107, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO75-D8E1-2SL1 controller"],
  ["AC-LSP-FPO75-D8E2-4SL1", "Accessories FPO75-D8E2-4SL1", "LifeSafety Power", 1030, 80, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO75-D8E2-4SL1 controller"],
  ["AC-LSP-FPO75-E1M", "Accessories FPO75-E1M", "LifeSafety Power", 104, 179, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO75-E1M controller"],
  ["AC-LSP-FPO75-E2M", "Accessories FPO75-E2M", "LifeSafety Power", 114, 99, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO75-E2M controller"],
  ["AC-LSP-FPO75/150-D8M8NL4E4M1", "Accessories FPO75/150-D8M8NL4E4M1", "LifeSafety Power", 1410, 180, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO75/150-D8M8NL4E4M1 controller"],
  ["AC-LSP-FPO75/75-8DR-DV", "Accessories FPO75/75-8DR-DV", "LifeSafety Power", 1310, 82, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "FPO75/75-8DR-DV controller"],
  ["AC-LSP-M8", "Accessories M8", "LifeSafety Power", 114, 118, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "M8 enclosure"],
  ["AC-LSP-MSM25", "Accessories MSM25", "LifeSafety Power", 94, 105, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "MSM25 enclosure"],
  ["AC-LSP-NL4", "Accessories NL4", "LifeSafety Power", 114, 128, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "NL4 enclosure"],
  ["AC-LSP-NLX-BOXED", "Accessories NLX-BOXED", "LifeSafety Power", 354, 151, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "NLX-BOXED enclosure"],
  ["AC-LSP-OSE-16DR-MER", "Accessories OSE-16DR-MER", "LifeSafety Power", 1830, 176, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "OSE-16DR-MER controller"],
  ["AC-LSP-OSE-16DR-MER-IO", "Accessories OSE-16DR-MER-IO", "LifeSafety Power", 2050, 116, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "OSE-16DR-MER-IO controller"],
  ["AC-LSP-OSE-16DR-MER-LCK", "Accessories OSE-16DR-MER-LCK", "LifeSafety Power", 2190, 90, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "OSE-16DR-MER-LCK controller"],
  ["AC-LSP-OSE-16DR-MER-LCK-IO", "Accessories OSE-16DR-MER-LCK-IO", "LifeSafety Power", 2410, 117, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "OSE-16DR-MER-LCK-IO controller"],
  ["AC-LSP-PS-MCLASS-E5M", "Accessories PS-MCLASS-E5M", "LifeSafety Power", 104, 115, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "PS-MCLASS-E5M enclosure"],
  ["AC-LSP-RACK-MOUNT-MERC-RGM75-D8PNZ", "Accessories RACK-MOUNT-MERC-RGM75-D8PNZ", "LifeSafety Power", 1520, 96, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "RACK-MOUNT-MERC-RGM75-D8PNZ controller"],
  ["AC-LSP-RACK-MOUNT-MERC-RGM75-D8PZ", "Accessories RACK-MOUNT-MERC-RGM75-D8PZ", "LifeSafety Power", 1520, 155, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "RACK-MOUNT-MERC-RGM75-D8PZ controller"],
  ["AC-LSP-RACK-MOUNT-MERC-RGM75-M8PNZ", "Accessories RACK-MOUNT-MERC-RGM75-M8PNZ", "LifeSafety Power", 1520, 104, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "RACK-MOUNT-MERC-RGM75-M8PNZ controller"],
  ["AC-LSP-RACK-MOUNT-MERC-RGM75B-C4PNZ", "Accessories RACK-MOUNT-MERC-RGM75B-C4PNZ", "LifeSafety Power", 1520, 159, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "RACK-MOUNT-MERC-RGM75B-C4PNZ controller"],
  ["AC-LSP-RACK-MOUNT-MERC-RGM75B-C4PZ", "Accessories RACK-MOUNT-MERC-RGM75B-C4PZ", "LifeSafety Power", 1520, 157, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "RACK-MOUNT-MERC-RGM75B-C4PZ controller"],
  ["AC-LSP-RACK-MOUNT-MERC-RGM75B-M8PNZ", "Accessories RACK-MOUNT-MERC-RGM75B-M8PNZ", "LifeSafety Power", 1520, 152, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "RACK-MOUNT-MERC-RGM75B-M8PNZ controller"],
  ["AC-LSP-RGM75B-M8PNZ1", "Accessories RGM75B-M8PNZ1", "LifeSafety Power", 1520, 147, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "RGM75B-M8PNZ1 controller"],
  ["AC-LSP-RM-BAT-RBE", "Accessories RM-BAT-RBE", "LifeSafety Power", 15.65, 151, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "RM-BAT-RBE enclosure"],
  ["AC-LSP-SDU", "Accessories SDU", "LifeSafety Power", 94, 138, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "SDU enclosure"],
  ["AC-LSP-WALL-MOUNT-FPO150-B100C8D8E2M", "Accessories WALL-MOUNT-FPO150-B100C8D8E2M", "LifeSafety Power", 1520, 138, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "WALL-MOUNT-FPO150-B100C8D8E2M controller"],
  ["AC-LSP-WIRED-FPO150-B1002D8PM8NL4E6M/P8-A", "Accessories WIRED-FPO150-B1002D8PM8NL4E6M/P8-A", "LifeSafety Power", 1520, 101, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "WIRED-FPO150-B1002D8PM8NL4E6M/P8-A controller"],
  ["AC-LSP-WIRED-FPO150-B100C82D8PE6M/P8-A", "Accessories WIRED-FPO150-B100C82D8PE6M/P8-A", "LifeSafety Power", 1520, 90, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "WIRED-FPO150-B100C82D8PE6M/P8-A controller"],
  ["AC-LSP-WIRED-FPO150/250-2C83D8PE8M2/P16-A", "Accessories WIRED-FPO150/250-2C83D8PE8M2/P16-A", "LifeSafety Power", 2540, 129, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "WIRED-FPO150/250-2C83D8PE8M2/P16-A controller"],
  ["AC-LSP-WIRED-FPO150/250-2C83D8PE8M2/P16-C", "Accessories WIRED-FPO150/250-2C83D8PE8M2/P16-C", "LifeSafety Power", 2540, 118, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "WIRED-FPO150/250-2C83D8PE8M2/P16-C controller"],
  ["AC-LSP-WIRED-FPO150/250-3D8P2M8NL4E8M2/P16-A", "Accessories WIRED-FPO150/250-3D8P2M8NL4E8M2/P16-A", "LifeSafety Power", 2540, 104, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "WIRED-FPO150/250-3D8P2M8NL4E8M2/P16-A controller"],
  ["AC-LSP-WIRED-FPO150/250-3D8P2M8NL4E8M2/P16-C", "Accessories WIRED-FPO150/250-3D8P2M8NL4E8M2/P16-C", "LifeSafety Power", 2540, 151, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "WIRED-FPO150/250-3D8P2M8NL4E8M2/P16-C controller"],
  ["AC-RO-SMALL-ENC", "Rolec small electrical enclosure", "Rolec", 115.6, 158, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png", "IP65 outdoor rated lockable small wall mount enclosure."],
  ["AC-ALX-T1AVK1F4SD", "Altronix T1AVK1F4SD kit", "Altronix", 538.92, 141, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/T1AVK1F4SD_08172021.jpg", "T1AVK1F4SD Altronix Trove1 kit with Altronix power supply/charger and sub-assemblies"],
  ["AC-ALX-T2AVK3F8D", "Altronix T2AVK3F8D kit", "Altronix", 845.62, 115, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/T2AVK3F8D_08172021.jpg", "T2AVK3F8D Altronix Trove2 kit with Altronix power supply/charger and sub-assemblies"],
  ["AC-ALX-T3AVK75F16D", "Altronix T3AVK75F16D kit", "Altronix", 1535.15, 160, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/T3AVK75F16D_08172021.jpg", "T3AVK75F16D Altronix Trove3 kit with Altronix power supply/charger and sub-assemblies"],
  ["AC-ALX-TAV400K6D", "Altronix TAV400K6D power supply", "Altronix", 428.08, 141, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/ACM/Trove-Power-Supply-Board_03252021.jpg", "Altronix power supply; 12VDC/24VDC; 4A; custom configured for Avigilon controllers"],
  ["AC-ALX-TAV400K7D", "Altronix TAV400K7D power supply", "Altronix", 538.92, 87, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/ACM/Trove-Power-Supply-Board_03252021.jpg", "Altronix power supply; 12VDC/24VDC; 6A; custom configured for Avigilon controllers"],
  ["AC-PRO-HM-1024", "Access Control Manager 6 Professional License (per 1024 readers)", "Accessories", 43651.7, 104, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 Professional Software License (per 1024 Readers)(per appliance)"],
  ["AC-PRO-HM-2048", "Access Control Manager 6 Professional License (per 2048 readers)", "Accessories", 87302.26, 117, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 Professional Software License (per 2048 Readers)(per appliance)"],
  ["AC-PRO-HM-256", "Access Control Manager 6 Professional License (per 256 readers)", "Accessories", 10910.97, 155, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 Professional Software License (per 256 Readers)(per appliance)"],
  ["AC-PRO-HM-512", "Access Control Manager 6 Professional License (per 512 readers)", "Accessories", 21822.48, 104, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 Professional Software License (per 512 Readers)(per appliance)"],
  ["AC-PRO-MIG-LDAP", "Access Control Manager 6 Professional Migration License (per LDAP appliance)", "Accessories", 3274.2, 159, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 Professional Migration Software License (per LDAP Appliance)"],
  ["AC-PRO-MIG-ORCL", "Access Control Manager 6 Professional Migration License (per Oracle appliance)", "Accessories", 4365.17, 157, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 Professional Migration Software License (per Oracle Appliance)"],
  ["AC-PRO-MIG-SQL", "Access Control Manager 6 Professional Migration License (per SQL appliance)", "Accessories", 2183.23, 152, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 Professional Migration Software License (per SQL Appliance)"],
  ["AC-PRO-MIGF-LDAP", "Access Control Manager 6 Professional Migration License (per LDAP appliance) failover", "Accessories", 3274.2, 79, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 Professional Migration Software License (per LDAP Appliance) (failover)"],
  ["AC-PRO-MIGF-ORCL", "Access Control Manager 6 Professional Migration License (per Oracle appliance) failover", "Accessories", 4365.17, 147, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 Professional Migration Software License (per Oracle Appliance) (failover)"],
  ["AC-PRO-MIGF-SQL", "Access Control Manager 6 Professional Migration License (per SQL appliance) failover", "Accessories", 2183.23, 151, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 Professional Migration Software License (per SQL Appliance) (failover)"],
  ["AC-PRO-SYNC-AD-AZURE", "Access Control Manager 6 Azure Active Directory Sync License", "Accessories", 5456.12, 91, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 Azure Active Directory Synchronization Software License (per appliance)"],
  ["AC-PRO-SYNC-AD-GEN", "Access Control Manager 6 Active Directory Sync License", "Accessories", 4365.17, 138, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 Active Directory Synchronization Software License (per appliance)"],
  ["AC-PRO-SYNC-LDAP", "Access Control Manager 6 LDAP Sync License", "Accessories", 3274.2, 138, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 LDAP Directory Synchronization Software License (per appliance)"],
  ["AC-PRO-SYNC-ORCL", "Access Control Manager 6 Oracle Sync License", "Accessories", 4365.17, 101, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 Oracle Server Synchronization Software License (per appliance)"],
  ["AC-PRO-SYNC-SQL", "Access Control Manager 6 SQL Sync License", "Accessories", 2183.23, 90, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 SQL Server Synchronization Software License (per appliance)"],
  ["AC-ALL-READ-APTIQ-OSDP-KEYPD-MTK15-485", "Schlage MTK15 multi-tech keypad reader", "Schlage", 691.8, 129, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/aptiQ-Smart-Reader-MTK15_08172020.jpg", "Multi-technology keypad reader; OSDP serial connectivity; black; single gang mount (Available only in the USA and Canada)"],
  ["AC-ALL-READ-APTIQ-OSDP-MULL-MT11-485", "Schlage MT11 multi-tech mullion reader", "Schlage", 420, 118, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/aptiQ-Smart-Reader-MT11_08172020.jpg", "Multi-technology reader; OSDP serial connectivity; black; mullion mount (Available only in the USA and Canada)"],
  ["AC-ALL-READ-APTIQ-OSDP-SNG-MT15-485", "Schlage MT15 multi-tech single gang reader", "Schlage", 520, 104, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/aptiQ-Smart-Reader-MT15_08172020.jpg", "Multi-technology reader; OSDP serial connectivity; black; single gang mount (Available only in the USA and Canada)"],
  ["AC-ALL-READ-APTIQ-WIEGAND-MTMSK15", "Schlage MTMSK15 magnetic stripe reader", "Schlage", 840, 151, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/aptiQ-Smart-Reader-MTK15_08172020.jpg", "Magnetic stripe reader with multi-technology keypad; Wiegand; black; single gang mount (Available only in the USA and Canada)"],
  ["AC-ALL-SCH-WPR400-MT", "Schlage WPR400-MT wireless reader", "Schlage", 2050, 158, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/Schlage-Wireless-Reader_08172020.jpg", "Wireless portable reader; multi-technology; with Schlage utility tool (Available only in the USA and Canada)"],
  ["AC-ALL-SCH-WPR400-SI", "Schlage WPR400-SI wireless reader", "Schlage", 1830, 141, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/Schlage-Wireless-Reader_08172020.jpg", "Wireless portable reader; smartcard only; with Schlage utility tool (Available only in the USA and Canada)"],
  ["AC-ALL-SCH-WRI400", "Schlage WRI400 wireless interface", "Schlage", 1050, 115, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/Schlage-Wireless-Interface_08172020.jpg", "Wireless reader interface module (Available only in the USA and Canada)"],
  ["AC-ING-READ-APTIQ-MINI-SM10", "Allegion SM10 mini-mullion smart reader", "Schlage", 318.52, 160, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/aptiQ-Smart-Reader-SM10_08172020.jpg", "Mini-mullion smartcard reader; Wiegand; black; mullion mount (Available only in the USA and Canada)"],
  ["AC-ING-READ-APTIQ-MULL-MT11", "Allegion MT11 multi-tech reader", "Schlage", 420.01, 141, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/aptiQ-Smart-Reader-MT11_08172020.jpg", "Multi-technology reader; Wiegand; black; mullion mount (Available only in the USA and Canada)"],
  ["AC-SCH-READER-MTB11", "Schlage MTB11 multi-tech reader", "Schlage", 442, 87, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/ACM/Schlage-MTB11_03252021.jpg", "Multi-technology reader; BLE; OSDP/Wiegand; black; mullion mount"],
  ["AC-SCH-READER-MTB15", "Schlage MTB15 multi-tech reader", "Schlage", 542, 104, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/ACM/Schlage-MTB15_03252021.jpg", "Multi-technology reader; BLE; OSDP/Wiegand; black; single gang mount"],
  ["AC-SCH-READER-MTKB15", "Schlage MTKB15 multi-tech keypad reader", "Schlage", 730, 117, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/ACM/Schlage-MTKB15_03252021.jpg", "Multi-technology keypad reader; BLE; OSDP/Wiegand; black; single gang mount"],
  ["AC-FP-READ-CSR-35L-OSDP", "Farpointe CSR-35L-OSDP reader", "Farpointe", 530, 155, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/Farpointe-Conekt-Reader-CSR-35_08172021.jpg", "Conekt smartcard reader; OSDP serial connectivity; black; single gang mount"],
  ["AC-FP-READ-CSR-35L-WG", "Farpointe CSR-35L-WG reader", "Farpointe", 420, 104, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/Farpointe-Conekt-Reader-CSR-35_08172021.jpg", "Conekt smartcard reader; Wiegand connectivity; black; single gang mount"],
  ["AC-FP-READ-DELTA-62-OSDP-F05552-600SCN", "Farpointe Delta6.2 smartcard reader", "Farpointe", 740, 159, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Delta6.2 smartcard reader; keypad; OSDP; black; single gang mount"],
  ["AC-FP-READ-DELTA-62-OSDP-F05662-600", "Farpointe Delta6.2 reader with keypad", "Farpointe", 740, 157, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Delta6.2 smartcard reader; keypad; OSDP; custom configured; black; single gang mount"],
  ["AC-FP-READ-DELTA3-SECTOR", "Farpointe Delta3 smartcard reader", "Farpointe", 420, 152, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Delta3 smartcard reader; sector data; black; mullion mount"],
  ["AC-FP-READ-DELTA5-OSDP", "Farpointe Delta5 reader OSDP", "Farpointe", 530, 79, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Delta5 smartcard reader; OSDP; black; single gang mount"],
  ["AC-FP-READ-DELTA5-SECTOR", "Farpointe Delta5 reader sector", "Farpointe", 530, 147, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Delta5 smartcard reader; sector data; black; single gang mount"],
  ["AC-FP-READ-DELTA5.3-SECTOR", "Farpointe Delta5.3 reader sector", "Farpointe", 740, 151, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Delta5.3 smartcard reader; sector data; with keypad; black; single gang mount"],
  ["AC-FP-READ-DELTA6.4-SECTOR", "Farpointe Delta6.4 reader sector", "Farpointe", 740, 91, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Delta6.4 smartcard reader; sector data; with keypad; black; single gang mount"],
  ["AC-FP-READ-GIBRALTER-BR-P-453-HA", "Farpointe P-453-HA reader", "Farpointe", 1030, 129, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "P-453-HA proximity reader; brass finish; custom programmed; H10301 26-Bit format"],
  ["AC-FP-READ-GIBRALTER-BR-P-455-HA", "Farpointe P-455-HA reader", "Farpointe", 1240, 118, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "P-455-HA proximity reader; brass finish; with keypad; custom programmed; H10301 26-Bit format"],
  ["AC-FP-READ-GUARDIAN-VR-P-403-HA", "Farpointe P-403-HA reader", "Farpointe", 1030, 104, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "P-403-HA proximity reader; vandal resistant; custom programmed; H10301 26-Bit format"],
  ["AC-FP-READ-GUARDIAN-VR-P-405-HA", "Farpointe P-405-HA reader", "Farpointe", 1240, 151, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "P-405-HA proximity reader; vandal resistant; with keypad; custom programmed; H10301 26-Bit format"],
  ["AC-FP-READ-GUARDIAN-VR-P-410-HA", "Farpointe P-410-HA reader", "Farpointe", 1530, 158, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "P-410-HA proximity reader; high security; vandal resistant; custom programmed; H10301 26-Bit format"],
  ["AC-FP-READ-P-300-H", "Farpointe P-300-H reader", "Farpointe", 180, 141, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/Farpointe-Cascade-Reader_08172021.jpg", "P-300-H proximity reader; black; mullion mount; H10301 26-Bit format"],
  ["AC-FP-READ-P-300-H-A", "Farpointe P-300-H-A reader", "Farpointe", 240, 115, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/Farpointe-Cascade-Reader_08172021.jpg", "P-300-H-A proximity reader; black; mullion mount; H10301 26-Bit format; custom programmed"],
  ["AC-FP-READ-P-500-H", "Farpointe P-500-H reader", "Farpointe", 194, 160, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/Farpointe-Cascade-Reader_08172021.jpg", "P-500-H proximity reader; black; single gang mount; H10301 26-Bit format"],
  ["AC-FP-READ-P-500-H-A", "Farpointe P-500-H-A reader", "Farpointe", 254, 141, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/Farpointe-Cascade-Reader_08172021.jpg", "P-500-H-A proximity reader; black; single gang mount; H10301 26-Bit format; custom programmed"],
  ["AC-FP-READ-P-640-H", "Farpointe P-640-H reader", "Farpointe", 404, 87, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "P-640-H proximity reader; with keypad; black; single gang mount; H10301 26-Bit format"],
  ["AC-FP-READ-P-640-H-A", "Farpointe P-640-H-A reader", "Farpointe", 484, 104, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "P-640-H-A proximity reader; with keypad; black; single gang mount; H10301 26-Bit format; custom programmed"],
  ["AC-FP-READ-P-640-H-OSDP", "Farpointe P-640-H-OSDP reader", "Farpointe", 510, 117, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "P-640-H proximity reader; with keypad; OSDP serial connectivity; black; single gang mount"],
  ["AC-FP-READ-P-710-H", "Farpointe P-710-H reader", "Farpointe", 320, 155, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/Farpointe-Cascade-Reader_08172021.jpg", "P-710-H proximity reader; medium range; black; single gang mount; H10301 26-Bit format"],
  ["AC-FP-READ-P-710-H-A", "Farpointe P-710-H-A reader", "Farpointe", 384, 104, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/Farpointe-Cascade-Reader_08172021.jpg", "P-710-H-A proximity reader; medium range; black; single gang mount; H10301 26-Bit format; custom programmed"],
  ["AC-FP-READ-P-900-H", "Farpointe P-900-H reader", "Farpointe", 840, 159, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/Farpointe-Cascade-Reader_08172021.jpg", "P-900-H proximity reader; long range; black; wall mount; H10301 26-Bit format"],
  ["AC-FP-READ-P-900-H-A", "Farpointe P-900-H-A reader", "Farpointe", 940, 157, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/Farpointe-Cascade-Reader_08172021.jpg", "P-900-H-A proximity reader; long range; black; wall mount; H10301 26-Bit format; custom programmed"],
  ["AC-FP-READ-PROX-EURO-P-530-HA", "Farpointe P-530-HA reader", "Farpointe", 420, 152, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "P-530-HA proximity reader; European box compatible; custom programmed; H10301 26-Bit format"],
  ["AC-FP-READ-PROX-KEYPAD-P-620-HA", "Farpointe P-620-HA reader", "Farpointe", 620, 79, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "P-620-HA proximity reader; with keypad; custom programmed; H10301 26-Bit format"],
  ["AC-FP-READ-WG-MCR-50-H", "Farpointe MCR-50-H card reader", "Farpointe", 420, 147, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "MCR-50-H magnetic stripe reader; black; single gang mount"],
  ["AC-FP-READER-OSDP-EM-64-H", "Farpointe EM-64-H reader", "Farpointe", 530, 151, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "EM-64-H smartcard reader; OSDP serial connectivity; black; single gang mount"],
  ["AC-FP-READER-P-300-H-OSDP", "Farpointe P-300-H-OSDP reader", "Farpointe", 254, 91, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/Farpointe-Cascade-Reader_08172021.jpg", "P-300-H proximity reader; OSDP serial connectivity; black; mullion mount"],
  ["AC-FP-READER-P-500-H-OSDP", "Farpointe P-500-H-OSDP reader", "Farpointe", 314, 129, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/Farpointe-Cascade-Reader_08172021.jpg", "P-500-H proximity reader; OSDP serial connectivity; black; single gang mount"],
  ["AC-FP-READER-PCR-620L-OSDP", "Farpointe PCR-620L-OSDP reader", "Farpointe", 740, 118, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/Farpointe-Conekt-Reader-CSR-35_08172021.jpg", "Conekt smartcard reader; keypad; OSDP serial connectivity; black; single gang mount"],
  ["AC-FP-READER-PCR-620L-WIEGAND", "Farpointe PCR-620L-WIEGAND reader", "Farpointe", 620, 104, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/Farpointe-Conekt-Reader-CSR-35_08172021.jpg", "Conekt smartcard reader; keypad; Wiegand connectivity; black; single gang mount"],
  ["AC-FP-READER-PCR-640L-OSDP", "Farpointe PCR-640L-OSDP reader", "Farpointe", 740, 151, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/Farpointe-Conekt-Reader-CSR-35_08172021.jpg", "Conekt smartcard reader; keypad; OSDP serial connectivity; black; single gang mount"],
  ["AC-FP-READER-PCR-640L-WIEGAND", "Farpointe PCR-640L-WIEGAND reader", "Farpointe", 620, 158, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/Farpointe-Conekt-Reader-CSR-35_08172021.jpg", "Conekt smartcard reader; keypad; Wiegand connectivity; black; single gang mount"],
  ["AC-FP-READER-WIEGAND-EM-64-H", "Farpointe EM-64-H reader Wiegand", "Farpointe", 420, 141, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "EM-64-H smartcard reader; Wiegand connectivity; black; single gang mount"],
  ["AC-FP-REC-LONG-RANGE-WRR-22", "Farpointe WRR-22 receiver", "Farpointe", 404, 115, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/Farpointe-Ranger-Receiver-WRR_08172021.jpg", "Farpointe Ranger WRR-22 receiver; 433 MHz; OSDP/Wiegand; dual channel; black"],
  ["AC-FP-REC-WRR-44", "Farpointe WRR-44 receiver", "Farpointe", 510, 160, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/Farpointe-Ranger-Receiver-WRR_08172021.jpg", "Farpointe Ranger WRR-44 receiver; 433 MHz; OSDP/Wiegand; four channel; black"],
  ["AC-HID-PIVCLASS-40HNKS-03-0005LE", "HID Signo PIV Reader", "HID", 578.89, 141, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40NKS-00-000000_071620.jpg", "Signo PIV 40 reader; Terminal; Prox Enabled; HDX; 200Bit FASC-N; 128Bit Fallback (HID # 40HNKS-03-0005LE)(HID Part Number: 40HNKS-03-0005LE)"],
  ["AC-HID-READ-ICLASS-SE-RK40", "HID iClass SE RK40 keypad reader", "HID", 840, 87, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "iCLASS SE RK40 smartcard reader with keypad; OSDP/Wiegand; black; single gang mount"],
  ["AC-HID-READ-ICLASS-SE-RPK40", "HID iClass SE RPK40 reader with keypad", "HID", 1040, 104, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "iCLASS SE RPK40 multi-technology reader with keypad; OSDP/Wiegand; black; single gang mount"],
  ["AC-HID-READ-MAXIPROX", "HID MaxiProx long range reader", "HID", 1350, 117, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "MaxiProx long range proximity reader; black; wall mount"],
  ["AC-HID-READ-MINIPROX", "HID MiniProx mullion reader", "HID", 318.52, 155, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "MiniProx proximity reader; black; mullion mount"],
  ["AC-HID-READ-OMNIKEY-R54270101", "HID OMNIKEY 5427 CK reader", "HID", 420, 104, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/Omnikey-5427-CK_08172020.jpg", "OMNIKEY 5427 CK dual frequency USB reader; black; desktop mount"],
  ["AC-HID-READ-PROXPRO", "HID ProxPro reader", "HID", 530, 159, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "ProxPro proximity reader; black; single gang mount"],
  ["AC-HID-READ-PROXPRO-KEYPD", "HID ProxPro reader with keypad", "HID", 740, 157, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "ProxPro proximity reader with keypad; black; single gang mount"],
  ["AC-HID-READ-PROXPROII", "HID ProxPro II reader", "HID", 420, 152, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "ProxPro II proximity reader; black; single gang mount"],
  ["AC-HID-READ-THINLINE", "HID ThinLine II reader", "HID", 420, 79, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "ThinLine II proximity reader; low profile; black; single gang mount"],
  ["AC-HID-READER-SIGNO-20KNKS-00-000000", "HID Signo 20 reader", "HID", 442, 147, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-20KNKS-00-000000_071620.jpg", "Signo 20 smartcard reader; keypad; terminal; BLE/OSDP; black; mullion mount"],
  ["AC-HID-READER-SIGNO-20KNKS-00-000000-AVG", "HID Signo 20 reader-AVG", "HID", 442, 151, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-20KNKS-00-000000_071620.jpg", "Signo 20 smartcard reader; keypad; terminal; BLE/OSDP; customized formatting; black; mullion mount"],
  ["AC-HID-READER-SIGNO-20KNKS-01-000000", "HID Signo 20 reader OSDP", "HID", 442, 91, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-20KNKS-00-000000_071620.jpg", "Signo 20 smartcard reader; keypad; terminal; BLE/OSDP; black; mullion mount"],
  ["AC-HID-READER-SIGNO-20KNKS-02-000000", "HID Signo 20 reader terminal", "HID", 442, 138, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-20KNKS-00-000000_071620.jpg", "Signo 20 smartcard reader; keypad; terminal; BLE/OSDP; black; mullion mount"],
  ["AC-HID-READER-SIGNO-20KNKS-02-000000-AVG", "HID Signo 20 reader-AVG", "HID", 442, 163, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-20KNKS-00-000000_071620.jpg", "Signo 20 smartcard reader; keypad; terminal; BLE/OSDP; customized formatting; black; mullion mount"],
  ["AC-HID-READER-SIGNO-20KNKS-T0-000000", "HID Signo 20 reader terminal T0", "HID", 442, 101, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-20KNKS-00-000000_071620.jpg", "Signo 20 smartcard reader; keypad; terminal; BLE/OSDP; T0 version; black; mullion mount"],
  ["AC-HID-READER-SIGNO-20KNKS-T1-000000", "HID Signo 20 reader terminal T1", "HID", 442, 90, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-20KNKS-00-000000_071620.jpg", "Signo 20 smartcard reader; keypad; terminal; BLE/OSDP; T1 version; black; mullion mount"],
  ["AC-HID-READER-SIGNO-20KNKS-T2-000000", "HID Signo 20 reader terminal T2", "HID", 442, 129, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-20KNKS-00-000000_071620.jpg", "Signo 20 smartcard reader; keypad; terminal; BLE/OSDP; T2 version; black; mullion mount"],
  ["AC-HID-READER-SIGNO-20KTKS-00-000000", "HID Signo 20 reader pigtail", "HID", 442, 118, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-20KNKS-00-000000_071620.jpg", "Signo 20 smartcard reader; keypad; pigtail; BLE/OSDP; black; mullion mount"],
  ["AC-HID-READER-SIGNO-20KTKS-00-000000-AVG", "HID Signo 20 reader-AVG", "HID", 442, 104, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-20KNKS-00-000000_071620.jpg", "Signo 20 smartcard reader; keypad; pigtail; BLE/OSDP; customized formatting; black; mullion mount"],
  ["AC-HID-READER-SIGNO-20KTKS-01-000000", "HID Signo 20 reader pigtail 01", "HID", 442, 151, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-20KNKS-00-000000_071620.jpg", "Signo 20 smartcard reader; keypad; pigtail; BLE/OSDP; black; mullion mount"],
  ["AC-HID-READER-SIGNO-20KTKS-01-000000-AVG", "HID Signo 20 reader-AVG", "HID", 442, 158, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-20KNKS-00-000000_071620.jpg", "Signo 20 smartcard reader; keypad; pigtail; BLE/OSDP; customized formatting; black; mullion mount"],
  ["AC-HID-READER-SIGNO-20KTKS-02-000000", "HID Signo 20 reader pigtail 02", "HID", 442, 141, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-20KNKS-00-000000_071620.jpg", "Signo 20 smartcard reader; keypad; pigtail; BLE/OSDP; black; mullion mount"],
  ["AC-HID-READER-SIGNO-20KTKS-02-000000-AVG", "HID Signo 20 reader-AVG", "HID", 442, 115, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-20KNKS-00-000000_071620.jpg", "Signo 20 smartcard reader; keypad; pigtail; BLE/OSDP; customized formatting; black; mullion mount"],
  ["AC-HID-READER-SIGNO-20KTKS-02-0002BL", "HID Signo 20 reader pigtail BLE", "HID", 442, 160, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-20KNKS-00-000000_071620.jpg", "Signo 20 smartcard reader; keypad; pigtail; BLE/OSDP; black; mullion mount"],
  ["AC-HID-READER-SIGNO-20KTKS-T0-000000", "HID Signo 20 reader pigtail T0", "HID", 442, 141, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-20KNKS-00-000000_071620.jpg", "Signo 20 smartcard reader; keypad; pigtail; BLE/OSDP; T0 version; black; mullion mount"],
  ["AC-HID-READER-SIGNO-20KTKS-T1-000000", "HID Signo 20 reader pigtail T1", "HID", 442, 87, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-20KNKS-00-000000_071620.jpg", "Signo 20 smartcard reader; keypad; pigtail; BLE/OSDP; T1 version; black; mullion mount"],
  ["AC-HID-READER-SIGNO-20NKS-00-000000", "HID Signo 20 smartcard reader", "HID", 351, 104, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-20NKS-00-000000_071620.jpg", "Signo 20 smartcard reader; terminal; BLE/OSDP; black; mullion mount"],
  ["AC-HID-READER-SIGNO-20NKS-00-000000-AVG", "HID Signo 20 smartcard reader-AVG", "HID", 351, 117, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-20NKS-00-000000_071620.jpg", "Signo 20 smartcard reader; terminal; BLE/OSDP; customized formatting; black; mullion mount"],
  ["AC-HID-READER-SIGNO-20NKS-01-000000", "HID Signo 20 smartcard reader terminal", "HID", 351, 155, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-20NKS-00-000000_071620.jpg", "Signo 20 smartcard reader; terminal; BLE/OSDP; black; mullion mount"],
  ["AC-HID-READER-SIGNO-20NKS-02-000000", "HID Signo 20 smartcard reader terminal 02", "HID", 351, 104, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-20NKS-00-000000_071620.jpg", "Signo 20 smartcard reader; terminal; BLE/OSDP; black; mullion mount"],
  ["AC-HID-READER-SIGNO-20NKS-02-000000-AVG", "HID Signo 20 smartcard reader-AVG", "HID", 351, 159, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-20NKS-00-000000_071620.jpg", "Signo 20 smartcard reader; terminal; BLE/OSDP; customized formatting; black; mullion mount"],
  ["AC-HID-READER-SIGNO-20NKS-02-0002BL", "HID Signo 20 smartcard reader terminal BLE", "HID", 351, 157, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-20NKS-00-000000_071620.jpg", "Signo 20 smartcard reader; terminal; BLE/OSDP; black; mullion mount"],
  ["AC-HID-READER-SIGNO-20NKS-T0-000000", "HID Signo 20 smartcard reader terminal T0", "HID", 351, 152, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-20NKS-00-000000_071620.jpg", "Signo 20 smartcard reader; terminal; BLE/OSDP; T0 version; black; mullion mount"],
  ["AC-HID-READER-SIGNO-20NKS-T1-000000", "HID Signo 20 smartcard reader terminal T1", "HID", 351, 79, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-20NKS-00-000000_071620.jpg", "Signo 20 smartcard reader; terminal; BLE/OSDP; T1 version; black; mullion mount"],
  ["AC-HID-READER-SIGNO-20NKS-T2-000000", "HID Signo 20 smartcard reader terminal T2", "HID", 351, 147, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-20NKS-00-000000_071620.jpg", "Signo 20 smartcard reader; terminal; BLE/OSDP; T2 version; black; mullion mount"],
  ["AC-HID-READER-SIGNO-20TKS-00-000000", "HID Signo 20 smartcard reader pigtail", "HID", 351, 151, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-20NKS-00-000000_071620.jpg", "Signo 20 smartcard reader; pigtail; BLE/OSDP; black; mullion mount"],
  ["AC-HID-READER-SIGNO-20TKS-00-000000-AVG", "HID Signo 20 smartcard reader-AVG", "HID", 351, 91, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-20NKS-00-000000_071620.jpg", "Signo 20 smartcard reader; pigtail; BLE/OSDP; customized formatting; black; mullion mount"],
  ["AC-HID-READER-SIGNO-20TKS-01-000000", "HID Signo 20 smartcard reader pigtail 01", "HID", 351, 138, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-20NKS-00-000000_071620.jpg", "Signo 20 smartcard reader; pigtail; BLE/OSDP; black; mullion mount"],
  ["AC-HID-READER-SIGNO-20TKS-01-000000-AVG", "HID Signo 20 smartcard reader-AVG", "HID", 351, 163, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-20NKS-00-000000_071620.jpg", "Signo 20 smartcard reader; pigtail; BLE/OSDP; customized formatting; black; mullion mount"],
  ["AC-HID-READER-SIGNO-20TKS-01-00001H", "HID Signo 20 smartcard reader pigtail OSDP", "HID", 351, 101, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-20NKS-00-000000_071620.jpg", "Signo 20 smartcard reader; pigtail; BLE/OSDP; black; mullion mount"],
  ["AC-HID-READER-SIGNO-20TKS-01-00001H-AVG", "HID Signo 20 smartcard reader-AVG", "HID", 351, 90, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-20NKS-00-000000_071620.jpg", "Signo 20 smartcard reader; pigtail; BLE/OSDP; customized formatting; black; mullion mount"],
  ["AC-HID-READER-SIGNO-20TKS-02-000000", "HID Signo 20 smartcard reader pigtail 02", "HID", 351, 129, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-20NKS-00-000000_071620.jpg", "Signo 20 smartcard reader; pigtail; BLE/OSDP; black; mullion mount"],
  ["AC-HID-READER-SIGNO-20TKS-02-000000-AVG", "HID Signo 20 smartcard reader-AVG", "HID", 351, 118, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-20NKS-00-000000_071620.jpg", "Signo 20 smartcard reader; pigtail; BLE/OSDP; customized formatting; black; mullion mount"],
  ["AC-HID-READER-SIGNO-20TKS-02-0002BL", "HID Signo 20 smartcard reader pigtail BLE", "HID", 351, 104, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-20NKS-00-000000_071620.jpg", "Signo 20 smartcard reader; pigtail; BLE/OSDP; black; mullion mount"],
  ["AC-HID-READER-SIGNO-20TKS-T0-000000", "HID Signo 20 smartcard reader pigtail T0", "HID", 351, 151, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-20NKS-00-000000_071620.jpg", "Signo 20 smartcard reader; pigtail; BLE/OSDP; T0 version; black; mullion mount"],
  ["AC-HID-READER-SIGNO-20TKS-T1-000000", "HID Signo 20 smartcard reader pigtail T1", "HID", 351, 158, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-20NKS-00-000000_071620.jpg", "Signo 20 smartcard reader; pigtail; BLE/OSDP; T1 version; black; mullion mount"],
  ["AC-HID-READER-SIGNO-20TKS-T2-000000", "HID Signo 20 smartcard reader pigtail T2", "HID", 351, 141, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-20NKS-00-000000_071620.jpg", "Signo 20 smartcard reader; pigtail; BLE/OSDP; T2 version; black; mullion mount"],
  ["AC-HID-READER-SIGNO-40KNKS-00-000000", "HID Signo 40 reader keypad terminal", "HID", 578.89, 115, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40KNKS-00-000000_071620.jpg", "Signo 40 smartcard reader; keypad; terminal; BLE/OSDP; black; single gang mount"],
  ["AC-HID-READER-SIGNO-40KNKS-00-000000-AVG", "HID Signo 40 reader keypad terminal-AVG", "HID", 578.89, 160, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40KNKS-00-000000_071620.jpg", "Signo 40 smartcard reader; keypad; terminal; BLE/OSDP; customized formatting; black; single gang mount"],
  ["AC-HID-READER-SIGNO-40KNKS-01-000000", "HID Signo 40 reader keypad terminal OSDP", "HID", 578.89, 141, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40KNKS-00-000000_071620.jpg", "Signo 40 smartcard reader; keypad; terminal; BLE/OSDP; black; single gang mount"],
  ["AC-HID-READER-SIGNO-40KNKS-02-000000", "HID Signo 40 reader keypad terminal 02", "HID", 578.89, 87, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40KNKS-00-000000_071620.jpg", "Signo 40 smartcard reader; keypad; terminal; BLE/OSDP; black; single gang mount"],
  ["AC-HID-READER-SIGNO-40KNKS-02-000000-AVG", "HID Signo 40 reader keypad terminal-AVG", "HID", 578.89, 104, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40KNKS-00-000000_071620.jpg", "Signo 40 smartcard reader; keypad; terminal; BLE/OSDP; customized formatting; black; single gang mount"],
  ["AC-HID-READER-SIGNO-40KNKS-02-0002BL", "HID Signo 40 reader keypad terminal BLE", "HID", 578.89, 117, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40KNKS-00-000000_071620.jpg", "Signo 40 smartcard reader; keypad; terminal; BLE/OSDP; black; single gang mount"],
  ["AC-HID-READER-SIGNO-40KNKS-T0-000000", "HID Signo 40 reader keypad terminal T0", "HID", 578.89, 155, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40KNKS-00-000000_071620.jpg", "Signo 40 smartcard reader; keypad; terminal; BLE/OSDP; T0 version; black; single gang mount"],
  ["AC-HID-READER-SIGNO-40KNKS-T1-000000", "HID Signo 40 reader keypad terminal T1", "HID", 578.89, 104, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40KNKS-00-000000_071620.jpg", "Signo 40 smartcard reader; keypad; terminal; BLE/OSDP; T1 version; black; single gang mount"],
  ["AC-HID-READER-SIGNO-40KNKS-T2-000000", "HID Signo 40 reader keypad terminal T2", "HID", 578.89, 159, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40KNKS-00-000000_071620.jpg", "Signo 40 smartcard reader; keypad; terminal; BLE/OSDP; T2 version; black; single gang mount"],
  ["AC-HID-READER-SIGNO-40KTKS-00-000000", "HID Signo 40 reader keypad pigtail", "HID", 578.89, 157, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40KNKS-00-000000_071620.jpg", "Signo 40 smartcard reader; keypad; pigtail; BLE/OSDP; black; single gang mount"],
  ["AC-HID-READER-SIGNO-40KTKS-00-000000-AVG", "HID Signo 40 reader keypad pigtail-AVG", "HID", 578.89, 152, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40KNKS-00-000000_071620.jpg", "Signo 40 smartcard reader; keypad; pigtail; BLE/OSDP; customized formatting; black; single gang mount"],
  ["AC-HID-READER-SIGNO-40KTKS-01-000000", "HID Signo 40 reader keypad pigtail 01", "HID", 578.89, 79, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40KNKS-00-000000_071620.jpg", "Signo 40 smartcard reader; keypad; pigtail; BLE/OSDP; black; single gang mount"],
  ["AC-HID-READER-SIGNO-40KTKS-01-000000-AVG", "HID Signo 40 reader keypad pigtail-AVG", "HID", 578.89, 147, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40KNKS-00-000000_071620.jpg", "Signo 40 smartcard reader; keypad; pigtail; BLE/OSDP; customized formatting; black; single gang mount"],
  ["AC-HID-READER-SIGNO-40KTKS-02-000000", "HID Signo 40 reader keypad pigtail 02", "HID", 578.89, 151, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40KNKS-00-000000_071620.jpg", "Signo 40 smartcard reader; keypad; pigtail; BLE/OSDP; black; single gang mount"],
  ["AC-HID-READER-SIGNO-40KTKS-02-000000-AVG", "HID Signo 40 reader keypad pigtail-AVG", "HID", 578.89, 91, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40KNKS-00-000000_071620.jpg", "Signo 40 smartcard reader; keypad; pigtail; BLE/OSDP; customized formatting; black; single gang mount"],
  ["AC-HID-READER-SIGNO-40KTKS-T0-000000", "HID Signo 40 reader keypad pigtail T0", "HID", 578.89, 138, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40KNKS-00-000000_071620.jpg", "Signo 40 smartcard reader; keypad; pigtail; BLE/OSDP; T0 version; black; single gang mount"],
  ["AC-HID-READER-SIGNO-40KTKS-T1-000000", "HID Signo 40 reader keypad pigtail T1", "HID", 578.89, 163, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40KNKS-00-000000_071620.jpg", "Signo 40 smartcard reader; keypad; pigtail; BLE/OSDP; T1 version; black; single gang mount"],
  ["AC-HID-READER-SIGNO-40KTKS-T2-000000", "HID Signo 40 reader keypad pigtail T2", "HID", 578.89, 101, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40KNKS-00-000000_071620.jpg", "Signo 40 smartcard reader; keypad; pigtail; BLE/OSDP; T2 version; black; single gang mount"],
  ["AC-HID-READER-SIGNO-40NKS-00-000000", "HID Signo 40 reader terminal", "HID", 431.14, 90, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40NKS-00-000000_071620.jpg", "Signo 40 smartcard reader; terminal; BLE/OSDP; black; single gang mount"],
  ["AC-HID-READER-SIGNO-40NKS-00-000000-AVG", "HID Signo 40 reader terminal-AVG", "HID", 431.14, 129, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40NKS-00-000000_071620.jpg", "Signo 40 smartcard reader; terminal; BLE/OSDP; customized formatting; black; single gang mount"],
  ["AC-HID-READER-SIGNO-40NKS-01-000000", "HID Signo 40 reader terminal 01", "HID", 431.14, 118, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40NKS-00-000000_071620.jpg", "Signo 40 smartcard reader; terminal; BLE/OSDP; black; single gang mount"],
  ["AC-HID-READER-SIGNO-40NKS-01-00001H", "HID Signo 40 reader terminal OSDP", "HID", 431.14, 104, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40NKS-00-000000_071620.jpg", "Signo 40 smartcard reader; terminal; BLE/OSDP; black; single gang mount"],
  ["AC-HID-READER-SIGNO-40NKS-02-000000", "HID Signo 40 reader terminal 02", "HID", 431.14, 151, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40NKS-00-000000_071620.jpg", "Signo 40 smartcard reader; terminal; BLE/OSDP; black; single gang mount"],
  ["AC-HID-READER-SIGNO-40NKS-02-000000-AVG", "HID Signo 40 reader terminal-AVG", "HID", 431.14, 158, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40NKS-00-000000_071620.jpg", "Signo 40 smartcard reader; terminal; BLE/OSDP; customized formatting; black; single gang mount"],
  ["AC-HID-READER-SIGNO-40NKS-02-0002BL", "HID Signo 40 reader terminal BLE", "HID", 431.14, 141, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40NKS-00-000000_071620.jpg", "Signo 40 smartcard reader; terminal; BLE/OSDP; black; single gang mount"],
  ["AC-HID-READER-SIGNO-40NKS-T0-000000", "HID Signo 40 reader terminal T0", "HID", 431.14, 115, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40NKS-00-000000_071620.jpg", "Signo 40 smartcard reader; terminal; BLE/OSDP; T0 version; black; single gang mount"],
  ["AC-HID-READER-SIGNO-40NKS-T1-000000", "HID Signo 40 reader terminal T1", "HID", 431.14, 160, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40NKS-00-000000_071620.jpg", "Signo 40 smartcard reader; terminal; BLE/OSDP; T1 version; black; single gang mount"],
  ["AC-HID-READER-SIGNO-40NKS-T2-000000", "HID Signo 40 reader terminal T2", "HID", 431.14, 141, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40NKS-00-000000_071620.jpg", "Signo 40 smartcard reader; terminal; BLE/OSDP; T2 version; black; single gang mount"],
  ["AC-HID-READER-SIGNO-40NKS-T3-00FD21", "HID Signo 40 reader terminal T3", "HID", 431.14, 87, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40NKS-00-000000_071620.jpg", "Signo 40 smartcard reader; terminal; BLE/OSDP; T3 version; black; single gang mount"],
  ["AC-HID-READER-SIGNO-40TKS-00-000000", "HID Signo 40 reader pigtail", "HID", 431.14, 104, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40NKS-00-000000_071620.jpg", "Signo 40 smartcard reader; pigtail; BLE/OSDP; black; single gang mount"],
  ["AC-HID-READER-SIGNO-40TKS-00-000000-AVG", "HID Signo 40 reader pigtail-AVG", "HID", 431.14, 117, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40NKS-00-000000_071620.jpg", "Signo 40 smartcard reader; pigtail; BLE/OSDP; customized formatting; black; single gang mount"],
  ["AC-HID-READER-SIGNO-40TKS-01-000000", "HID Signo 40 reader pigtail 01", "HID", 431.14, 155, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40NKS-00-000000_071620.jpg", "Signo 40 smartcard reader; pigtail; BLE/OSDP; black; single gang mount"],
  ["AC-HID-READER-SIGNO-40TKS-01-000000-AVG", "HID Signo 40 reader pigtail-AVG", "HID", 431.14, 104, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40NKS-00-000000_071620.jpg", "Signo 40 smartcard reader; pigtail; BLE/OSDP; customized formatting; black; single gang mount"],
  ["AC-HID-READER-SIGNO-40TKS-01-00001H", "HID Signo 40 reader pigtail OSDP", "HID", 431.14, 159, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40NKS-00-000000_071620.jpg", "Signo 40 smartcard reader; pigtail; BLE/OSDP; black; single gang mount"],
  ["AC-HID-READER-SIGNO-40TKS-01-00001H-AVG", "HID Signo 40 reader-AVG", "HID", 431.14, 157, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40NKS-00-000000_071620.jpg", "Signo 40 smartcard reader; pigtail; BLE/OSDP; customized formatting; black; single gang mount"],
  ["AC-HID-READER-SIGNO-40TKS-02-000000", "HID Signo 40 reader pigtail 02", "HID", 431.14, 152, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40NKS-00-000000_071620.jpg", "Signo 40 smartcard reader; pigtail; BLE/OSDP; black; single gang mount"],
  ["AC-HID-READER-SIGNO-40TKS-02-000000-AVG", "HID Signo 40 reader-AVG", "HID", 431.14, 79, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40NKS-00-000000_071620.jpg", "Signo 40 smartcard reader; pigtail; BLE/OSDP; customized formatting; black; single gang mount"],
  ["AC-HID-READER-SIGNO-40TKS-T0-000000", "HID Signo 40 reader pigtail T0", "HID", 431.14, 147, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40NKS-00-000000_071620.jpg", "Signo 40 smartcard reader; pigtail; BLE/OSDP; T0 version; black; single gang mount"],
  ["AC-HID-READER-SIGNO-40TKS-T1-000000", "HID Signo 40 reader pigtail T1", "HID", 431.14, 151, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40NKS-00-000000_071620.jpg", "Signo 40 smartcard reader; pigtail; BLE/OSDP; T1 version; black; single gang mount"],
  ["AC-HID-READER-SIGNO-40TKS-T2-000000", "HID Signo 40 reader pigtail T2", "HID", 431.14, 91, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40NKS-00-000000_071620.jpg", "Signo 40 smartcard reader; pigtail; BLE/OSDP; T2 version; black; single gang mount"],
  ["AC-HID-READER-SIGNO-40TKS-T3-00FD21", "HID Signo 40 reader pigtail T3", "HID", 431.14, 138, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/AC-HID-READER-SIGNO-40NKS-00-000000_071620.jpg", "Signo 40 smartcard reader; pigtail; BLE/OSDP; T3 version; black; single gang mount"],
  ["AC-HID-UPGKIT-BLEOSDP-UPG-A-920", "HID BLE & OSDP upgrade kit", "HID", 920, 163, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/HID-BLE-OSDP-Upgrade-Kit_08172020.jpg", "Bluetooth Low Energy (BLE) & OSDP serial protocol upgrade module; compatible with iCLASS SE/multiCLASS SE readers; pack of 10"],
  ["AC-STID-ACSS-RAIN-COVER", "STid rain cover", "STid", 48, 101, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Protective rain/weather cover; compatible with Architect/Architect Blue series readers"],
  ["AC-STID-ALM-24V", "STid alarm module", "STid", 115.6, 90, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "External audible alarm module; 24VDC; for high security area doors"],
  ["AC-STID-ARCHITECT-PROGRAMMING-KIT-SECARD-BT", "STid SECARD Architect BT programming kit", "STid", 2420, 129, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/STid-SECARD_08172021.jpg", "SECARD Bluetooth programming software & USB reader kit; for custom system keys/configurations"],
  ["AC-STID-CARD-CCTW170", "STid Architect non-programmed CCTW170 card", "STid", 680, 118, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Architect CCTW170 card; non-programmed MIFARE DESFire EV2 2K; blank printable; pack of 100"],
  ["AC-STID-CARD-CCTW880", "STid Architect non-programmed CCTW880 card", "STid", 530, 104, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Architect CCTW880 card; non-programmed MIFARE Classic 1K EV1; blank printable; pack of 100"],
  ["AC-STID-EM+HID-LF-MODULE-SE810", "STid LF module", "STid", 810, 151, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Architect SE810 low frequency (125 kHz EM/HID) module; compatible with Architect Blue readers; pack of 10"],
  ["AC-STID-KEYFOB-NONPROGRAMED-PCGW871_AP", "STid non-programmed fobs", "STid", 135, 158, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/STid-Architect-Reader-with-Keyfobs_08172021.jpg", "PCGW871_AP Architect non-programmed fobs; black; pack of 10"],
  ["AC-STID-READ-ARC1-A_BT-OSDP", "STid ARC1-A_BT-OSDP reader", "STid", 420, 141, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/STid-Architect-Reader-ARC1_08172021.jpg", "Architect ARC1-A_BT-OSDP mullion smartcard reader; BLE/NFC; black"],
  ["AC-STID-READ-ARC1-A_BT-WIEGAND", "STid ARC1-A_BT-WIEGAND reader", "STid", 351, 115, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/STid-Architect-Reader-ARC1_08172021.jpg", "Architect ARC1-A_BT-WIEGAND mullion smartcard reader; BLE/NFC; black"],
  ["AC-STID-READ-ARC1-B_BT-OSDP", "STid ARC1-B_BT-OSDP reader", "STid", 530, 160, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/STid-Architect-Reader-ARC1_08172021.jpg", "Architect ARC1-B_BT-OSDP single gang smartcard reader; BLE/NFC; black"],
  ["AC-STID-READ-ARC1-B_BT-WIEGAND", "STid ARC1-B_BT-WIEGAND reader", "STid", 431.14, 141, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/STid-Architect-Reader-ARC1_08172021.jpg", "Architect ARC1-B_BT-WIEGAND single gang smartcard reader; BLE/NFC; black"],
  ["AC-STID-READ-ARC1-C_BT-OSDP", "STid ARC1-C_BT-OSDP reader with keypad", "STid", 740, 87, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/STid-Architect-Reader-with-Keypad-ARC1-C_08172021.jpg", "Architect ARC1-C_BT-OSDP single gang smartcard reader; with keypad; BLE/NFC; black"],
  ["AC-STID-READ-ARC1-C_BT-WIEGAND", "STid ARC1-C_BT-WIEGAND reader with keypad", "STid", 578.89, 104, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/STid-Architect-Reader-with-Keypad-ARC1-C_08172021.jpg", "Architect ARC1-C_BT-WIEGAND single gang smartcard reader; with keypad; BLE/NFC; black"],
  ["AC-STID-READ-ARC1-D_BT-OSDP", "STid ARC1-D_BT-OSDP reader with touchscreen", "STid", 1040, 117, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/STid-Architect-Reader-with-Screen-ARC1-D_08172021.jpg", "Architect ARC1-D_BT-OSDP single gang smartcard reader; with touchscreen; BLE/NFC; black"],
  ["AC-STID-READ-ARC1-D_BT-WIEGAND", "STid ARC1-D_BT-WIEGAND reader with touchscreen", "STid", 840, 155, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/STid-Architect-Reader-with-Screen-ARC1-D_08172021.jpg", "Architect ARC1-D_BT-WIEGAND single gang smartcard reader; with touchscreen; BLE/NFC; black"],
  ["AC-STID-READ-ARC1-E_BT-OSDP", "STid ARC1-E_BT-OSDP reader with QR code", "STid", 1350, 104, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/STid-Architect-Reader-with-QR-Code-ARC1-E_08172021.jpg", "Architect ARC1-E_BT-OSDP single gang smartcard reader; with QR code; BLE/NFC; black"],
  ["AC-STID-READ-ARC1-E_BT-WIEGAND", "STid ARC1-E_BT-WIEGAND reader with QR code", "STid", 1040, 159, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/STid-Architect-Reader-with-QR-Code-ARC1-E_08172021.jpg", "Architect ARC1-E_BT-WIEGAND single gang smartcard reader; with QR code; BLE/NFC; black"],
  ["AC-STID-READ-ARC1-F_BT-OSDP", "STid ARC1-F_BT-OSDP biometric reader", "STid", 1530, 157, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/STid-Architect-Reader-Biometric-ARC1-F_08172021.jpg", "Architect ARC1-F_BT-OSDP single gang biometric fingerprint reader; BLE/NFC; black"],
  ["AC-STID-READ-ARC1-F_BT-WIEGAND", "STid ARC1-F_BT-WIEGAND biometric reader", "STid", 1240, 152, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/STid-Architect-Reader-Biometric-ARC1-F_08172021.jpg", "Architect ARC1-F_BT-WIEGAND single gang biometric fingerprint reader; BLE/NFC; black"],
  ["AC-STID-READ-ARC1-G_BT-OSDP", "STid ARC1-G_BT-OSDP desktop reader", "STid", 420, 79, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Architect ARC1-G_BT-OSDP smartcard desktop reader; BLE/NFC; black"],
  ["AC-STID-READ-ARC1-G_BT-WIEGAND", "STid ARC1-G_BT-WIEGAND desktop reader", "STid", 351, 147, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Architect ARC1-G_BT-WIEGAND smartcard desktop reader; BLE/NFC; black"],
  ["AC-STID-READ-ARC1-H_BT-OSDP", "STid ARC1-H_BT-OSDP reader with keypad & screen", "STid", 1150, 151, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/STid-Architect-Reader-with-Keypad-and-Screen_08172021.jpg", "Architect ARC1-H_BT-OSDP single gang smartcard reader; with keypad & screen; BLE/NFC; black"],
  ["AC-STID-READ-ARC1-H_BT-WIEGAND", "STid ARC1-H_BT-WIEGAND reader with keypad & screen", "STid", 940, 91, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/STid-Architect-Reader-with-Keypad-and-Screen_08172021.jpg", "Architect ARC1-H_BT-WIEGAND single gang smartcard reader; with keypad & screen; BLE/NFC; black"],
  ["AC-STID-READ-SPECTRE-V1_BT-OSDP", "STid SPECTRE-V1_BT-OSDP long range reader", "STid", 1830, 138, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/STid-Spectre-Reader_08172021.jpg", "Spectre long range vehicle identification reader; BLE; OSDP; IP65; grey"],
  ["AC-STID-READ-SPECTRE-V1_BT-WIEGAND", "STid SPECTRE-V1_BT-WIEGAND long range reader", "STid", 1520, 163, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/STid-Spectre-Reader_08172021.jpg", "Spectre long range vehicle identification reader; BLE; Wiegand; IP65; grey"],
  ["AC-STID-CARD-PREPROGRAMED-CCTW170MSI", "STid Architect pre-programmed CCTW170MSI card", "STid", 740, 101, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "CCTW170MSI smartcard; pre-programmed; printable; pack of 100"],
  ["AC-STID-CARD-PREPROGRAMED-CCTW880MSI", "STid Architect pre-programmed CCTW880MSI card", "STid", 600, 90, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "CCTW880MSI smartcard; pre-programmed; printable; pack of 100"],
  ["AC-STID-CARD-CCTW170_AP", "STid non-programmed CCTW170_AP card", "STid", 680, 129, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "CCTW170_AP card; non-programmed MIFARE DESFire EV2 2K; blank printable; pack of 100"],
  ["AC-STID-CARD-CCTW880_AP", "STid Architect non-programmed CCTW880_AP card", "STid", 530, 118, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Architect CCTW880_AP card; non-programmed MIFARE Classic 1K EV1; blank printable; pack of 100"],
  ["AC-STID-KEYFOB-NONPROGRAMED-PCGW871_AP-COLOR", "STid Architect colored fobs", "STid", 135, 104, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/STid-Architect-Reader-with-Keyfobs_08172021.jpg", "Architect colored non-programmed fobs; mixed pack; pack of 10"],
  ["AC-STID-KEYFOB-PREPROGRAMED-PCGW871MSI_AP-COLOR", "STid Architect pre-programmed colored fobs", "STid", 1350, 151, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/STid-Architect-Reader-with-Keyfobs_08172021.jpg", "PCGW871MSI_AP colored key fobs; pre-programmed; mixed pack; pack of 100"],
  ["HD-NVR4-WARR-EXTEND-2YR", "2 Year Extended Warranty for HD NVR4", "HD Security", 618.84, 104, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/ACM_Professional-Server_Side-Angle_v3.jpg", "2 Year Extended Warranty for HD NVR4"],
  ["AC-SALTO-BLUENET-BLACK-GATEWAYB3CUS", "SALTO GATEWAYB3CUS", "SALTO", 1020.86, 105, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-BLUENET-BLACK-GATEWAYB3CUS-03242021.jpg", "Wireless Gateway|BLUEnet node|black|12VDC xfmr; Ethernet|supports upto 6 additional wired nodes (Available only in the USA and Canada)"],
  ["AC-SALTO-BLUENET-WHITE-GATEWAYW3CUS", "SALTO GATEWAYW3CUS", "SALTO", 1020.86, 101, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-BLUENET-WHITE-GATEWAYW3CUS-03242021.jpg", "Wireless Gateway|BLUEnet node|white|12VDC xfmr; Ethernet|supports upto 6 additional wired nodes (Available only in the USA and Canada)"],
  ["AC-SALTO-CONTROL-UNIT-IP-CLEARCOVER-CU42E0TUS", "SALTO CU42E0TUS", "SALTO", 1848.08, 98, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-CONTROL-CU42E0-03242021.jpg", "Control Unit|XS4 2.0|two rdr|6 in|4 out|ethernet; expandable via RS485|12VDC xfmr|encl|clear cover (Available only in the USA and Canada)"],
  ["AC-SALTO-CONTROL-UNIT-IP-GREYCOVER-CU42E0GUS", "SALTO CU42E0GUS", "SALTO", 1848.08, 87, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-CONTROL-CU42xxG-03242021.jpg", "Control Unit|XS4 2.0|two rdr|6 in|4 out|ethernet; expandable via RS485|12VDC xfmr|encl|Grey cover (Available only in the USA and Canada)"],
  ["AC-SALTO-CONTROL-UNIT-IP-NOCOVER-CU42E0US", "SALTO CU42E0US", "SALTO", 1848.08, 164, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-CONTROL-CU42E0-03242021.jpg", "Control Unit|XS4 2.0|two rdr|6 in|4 out|ethernet; expandable via RS485|12VDC xfmr|No enclosure (Available only in the USA and Canada)"],
  ["AC-SALTO-CONTROL-UNIT-RS485-CLEARCOVER-CU4200TUS", "SALTO CU4200TUS", "SALTO", 1051.76, 83, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-CONTROL-CU4200T-03242021.jpg", "Control Unit|XS4 2.0|two rdr|6 in|4 out|RS485 aux; offline or exp of CU42Ex|12V xfmr|encl|Clear cover (Available only in the USA and Canada)"],
  ["AC-SALTO-CONTROL-UNIT-RS485-GREYCOVER-CU4200GUS", "SALTO CU4200GUS", "SALTO", 1051.76, 156, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-CONTROL-CU42xxG-03242021.jpg", "Control Unit|XS4 2.0|two rdr|6 in|4 out|RS485 aux; offline or exp of CU42Ex|12V xfmr|encl|Grey cover (Available only in the USA and Canada)"],
  ["AC-SALTO-CONTROL-UNIT-RS485-NOCOVER-CU4200US", "SALTO CU4200US", "SALTO", 1051.76, 164, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-CONTROL-CU4200-03242021.jpg", "Control Unit|XS4 2.0|two rdr|6 in|4 out|RS485 aux; offline or exp of CU42Ex|12VDC xfmr|No enclosure (Available only in the USA and Canada)"],
  ["AC-SALTO-CREDENTIAL-CONSTRUCTION-MIFARE-PCM01KC", "SALTO PCM01KC", "SALTO", 38.34, 184, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-CARD-03242021.jpg", "Credential|Construction Card|Mifare; testing and management prior to initialization"],
  ["AC-SALTO-CREDENTIAL-FOB-SVN-BLUE-PFD04KBSVNKS-5", "SALTO PFD04KBSVNKS-5", "SALTO", 115.98, 139, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/TAG-MULTI-LINE-KM-030222.jpg", "SVNKS |SALTO KS + SVN compatible Tags - Blue - Pack of 5 (Available only in the USA and Canada)"],
  ["AC-SALTO-CREDENTIAL-FOB-SVN-GREEN-PFD04KGSVNKS-5", "SALTO PFD04KGSVNKS-5", "SALTO", 115.98, 81, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/TAG-MULTI-LINE-KM-030222.jpg", "SVNKS |SALTO KS + SVN compatible Tags - Green - Pack of 5 (Available only in the USA and Canada)"],
  ["AC-SALTO-CREDENTIAL-FOB-SVN-RED-PFD04KRSVNKS-5", "SALTO PFD04KRSVNKS-5", "SALTO", 115.98, 145, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/TAG-MULTI-LINE-KM-030222.jpg", "SVNKS |SALTO KS + SVN compatible Tags - Red - Pack of 5 (Available only in the USA and Canada)"],
  ["AC-SALTO-CREDENTIAL-FOB-SVN-SILVER-PFD04KSSVNKS-5", "SALTO PFD04KSSVNKS-5", "SALTO", 115.98, 124, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/TAG-MULTI-LINE-KM-030222.jpg", "SVNKS |SALTO KS + SVN compatible Tags - Silver - Pack of 5 (Available only in the USA and Canada)"],
  ["AC-SALTO-CREDENTIAL-FOB-SVN-WHITE-PFD04KWSVNKS-5", "SALTO PFD04KWSVNKS-5", "SALTO", 115.98, 74, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/TAG-MULTI-LINE-KM-030222.jpg", "SVNKS |SALTO KS + SVN compatible Tags - White - Pack of 5 (Available only in the USA and Canada)"],
  ["AC-SALTO-DESFIRE-2K-CCVD20700-50", "Salto Credential CCVD20700-50", "SALTO", 327.95, 73, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Credential CCVD20700-50 card; DESFire 2K; pack of 50"],
  ["AC-SALTO-DOOR-DETECTOR-ESCUTCHEON-RFDTCTS18W01", "SALTO RFDTCTS18W01", "SALTO", 69.62, 81, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "RFDTCT | Door detector with plug connection for the SALTO wireles escutcheon; S | For steel doors; 18 | For wide body escutcheons (Available only in the USA and Canada)"],
  ["AC-SALTO-DOOR-DETECTOR-ESCUTCHEON-RFDTCTW18W01", "SALTO Accessories RFDTCTW18W01", "SALTO", 69.62, 97, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "SALTO RFDTCT Door detector with plug connection for the SALTO wireless escutcheon - for Wood doors.- for wide body escutcheons"],
  ["AC-SALTO-ELEVATOR-FEATURE-SOFTWARE-SPACE-OPT-0035", "SALTO SPACE-OPT-0035", "SALTO", 1533.6, 99, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-PROACCESS-SPACE-03242021.jpg", "SALTO SPACE-OPT-0035 This feature permits you to enable the elevators communication module to mange systems like Schindler PORT protocole. Feature only available individually and is not included in any package.(Available only in the USA and Canada)"],
  ["AC-SALTO-EMERGENCY-POWER-SUPPLY-EPS100", "SALTO EPS100", "SALTO", 68.57, 134, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-EPS100-03242021.png", "Emergency Power Supply|PPD connection cord; battery harness|requires 4 AA batteries (Available only in the USA and Canada)"],
  ["AC-SALTO-ENCODER-DESFIRE-EC904B0US", "SALTO EC904B0US", "SALTO", 1328.28, 147, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-ENCODER-03242021.png", "SALTO NCoder - Proximity card encoder Mifare/DESFire. USB and Ethernet connections. DHCP addressing. Desktop reader capabilities (Bluetooth mobile keys not supported)(Available only in the USA and Canada)"],
  ["AC-SALTO-ENCODER-DESFIRE-ECB04B0US", "SALTO ECB04B0US", "SALTO", 1992.35, 73, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-ENCODER-03242021.png", "Encoder|BLE|DESFire|Mifare|ethernet; USB|can be used as desktop reader (Available only in the USA and Canada)"],
  ["AC-SALTO-EXPANSION-UNIT-RS485-NOCOVER-CU4EB8US", "SALTO CU4EB8US", "SALTO", 908.7, 141, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/XS4_CU4EB8_2-081812021.png", "Expansion Unit|XS4 2.0|4 in|8 out|RS485 auxillary; exp of CU42xx|12VDC xfmr|No enclosure (Available only in the USA and Canada)"],
  ["AC-SALTO-MOBILE-USER-LICENSE-SPACE-OPT-0016-1", "SALTO SPACE-OPT-0016-1", "SALTO", 4.73, 95, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-PROACCESS-SPACE-03242021.jpg", "SALTO ProAccess SPACE; SPACE Mobile Users License (0016-1); included for first 12 months from software registration; billed annually therafter - Requires Annual Subscription Renewal (0028-2) (Available only in the USA and Canada)"],
  ["AC-SALTO-PORTABLE-PROGRAMMING-DEVICE-PPD800", "SALTO PPD800", "SALTO", 1194.76, 161, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-XS4-PPD800-03242021.jpg", "Portable Programming Device|NFC|USB connection; 3 pin harness connector|req 3 AAA batteries; incl (Available only in the USA and Canada)"],
  ["AC-SALTO-PROACCESS-SPACE-SOFTWARE-SPACE-OPT-0032", "SALTO SPACE-OPT-0032", "SALTO", 1533.6, 153, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-PROACCESS-SPACE-03242021.jpg", "SALTO ProAccess SPACE software SPACE-OPT-0032; SALTO event-alarms & communication module. Enables event alarms and also sends emails to the operators generated by the events. (Available only in the USA and Canada)"],
  ["AC-SALTO-PROACCESS-SPACE-SOFTWARE-SPAONLINE", "SALTO SPAONLINE", "SALTO", 2180.34, 159, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-PROACCESS-SPACE-03242021.jpg", "SALTO ProAccess SPACE; ProAccess SPACE Software |Online|SVN|RF|Lockdown; Event Stream|Automatic Key Assignment|Less Photo (Available only in the USA and Canada)"],
  ["AC-SALTO-PROACCESS-SPACE-SOFTWARE-SPAPART", "SALTO SPAPART", "SALTO", 5263.97, 139, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-PROACCESS-SPACE-03242021.jpg", "SALTO ProAccess SPACE software Partitional package that includes: - All the features included in the SALTO ProAccess SPACE ID System package - Partitional functionalities (department operator) (Available only in the USA and Canada)"],
  ["AC-SALTO-SAMKIT9", "SALTO SAMKIT9", "SALTO", 21667.08, 123, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-PROACCESS-SPACE-03242021.jpg", "Salto Authorization Module(SAM)|DESFire|EndUser; requires EC9xx|application subject to approval; SAM Software Kit. Includes SAM Software; SAM card. (Available only in the USA and Canada)"],
  ["AC-SALTO-SAMKITH", "SALTO SAMKITH", "SALTO", 21667.08, 98, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-PROACCESS-SPACE-03242021.jpg", "Salto Authorization Module(SAM)|HID iClass|EndUser; requires ECHxx|application subject to approval; SAM Software Kit. Includes SAM Software; SAM card. (Available only in the USA and Canada)"],
  ["AC-SALTO-SHIP-OPTION-SPACE-OPT-0018", "SALTO SPACE-OPT-0018", "SALTO", 613.5, 127, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-PROACCESS-SPACE-03242021.jpg", "SALTO ProAccess SPACE; SPACE SHIP Interface Option (0018) (Available only in the USA and Canada)"],
  ["AC-SALTO-UPDATER-KIT-UBOX42DBABTUS", "Salto UBOX42DBABTUS", "SALTO", 945.54, 145, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/UBOX4000-081812021.png", "The UBOX4000 offers a compact solution updater kit based on a SALTO Controller and a Wall Reader that permits to integrate with third party products. ANSI - North American - Single gang mount reader; Black; Transparent Cover; US version; Includes UBOX 42 controller in a case with translucent cover and black ANSI rectangular BLE Mifare DESFire reader. (Available only in the USA and Canada)"],
  ["AC-SALTO-UPDATER-KIT-UBOX42DBMBTUS", "Salto UBOX42DBMBTUS", "SALTO", 945.54, 105, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/UBOX4000-081812021.png", "The UBOX4000 offers a compact solution updater kit based on a SALTO Controller and a Wall Reader that permits to integrate with third party products. Mullion - narrow reader; Black; Transparent Cover; US version; Includes UBOX 42 controller in a case with translucent cover and black mullion BLE Mifare DESFire reader. (Available only in the USA and Canada)"],
  ["AC-SALTO-WIRELESS-NODE-BLUENET-RFNODE3", "SALTO RFNODE3", "SALTO", 195.2, 173, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-RFNODE-BLUENET-03242021.png", "Wireless Node|BLUEnet|white; Wired|requires GATEWAYxx for operation (Available only in the USA and Canada)"],
  ["AC-SALTO-WIRELESS-OPTION-BLUENET-SPACE-OPT-0033", "SALTO SPACE-OPT-0033", "SALTO", 185.08, 181, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-PROACCESS-SPACE-03242021.jpg", "SALTO ProAccess SPACE; SPACE BLUEnet Wireless Connection Option (0033); 1ea per Lockset (online)"],
  ["AC-SALTO-WIRELESS-OPTION-RF-SPACE-OPT-0021", "SALTO SPACE-OPT-0021", "SALTO", 146.28, 70, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-PROACCESS-SPACE-03242021.jpg", "SALTO ProAccess SPACE; SPACE Wireless Option (0021)|enables RF (Available only in the USA and Canada)"],
  ["AC-SALTO-WIRELESS-REPEATER-BLUENET-REPEATER03US", "SALTO REPEATER03US", "SALTO", 195.2, 167, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-WIRELESS-REPEATER-WHITE-03242021.png", "Wireless Repeater|BLUEnet|white; Wired|requires GATEWAYx3 or RFNODE3 for operation (Available only in the USA and Canada)"],
  ["AC-SALTO-WRDM0A4B", "Salto Wall Reader Mifare BLE HSE ANSI (standard) Black", "SALTO", 740.51, 173, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Salto Wall Reader Mifare BLE HSE ANSI (standard) Black"],
  ["AC-SALTO-WRDM0A4W", "Salto Wall Reader Mifare BLE HSE ANSI (standard) White", "SALTO", 740.51, 90, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg", "Salto Wall Reader Mifare BLE HSE ANSI (standard) White"],
  ["AC-SALTO-WRDM0M4B", "Salto Wall Reader Mifare BLE HSE Mullion Black", "SALTO", 740.51, 159, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg", "Salto Wall Reader Mifare BLE HSE Mullion Black"],
  ["AC-SALTO-XS4-OP-PANIC-BAR-KIT-CR-KPP17IM", "SALTO KPP17IM", "SALTO", 456.19, 124, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "SALTO XS4 Original + PB Kit| Corbin Russwin ED2500 & Yale 7100 | SVN|satin stainless (Available only in the USA and Canada)"],
  ["AC-SALTO-XS4-OP-PANIC-BAR-KIT-DK-KPP55IM", "SALTO KPP55IM", "SALTO", 456.19, 113, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "SALTO XS4 Original + PB Kit | Dorma Kabba | SVN|satin stainless (Available only in the USA and Canada)"],
  ["AC-SALTO-XS4-OP-PANIC-BAR-KIT-SAR-KPP08IM", "SALTO KPP08IM", "SALTO", 456.19, 105, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "SALTO XS4 Original +PB Kit| SARGENT 8888 | SVN|satin stainless (Available only in the USA and Canada)"],
  ["AC-SALTO-XS4-OP-WB-ESCUTCHEON-ANSI-AM666G00IMB38", "SALTO AM666G00IMB38", "SALTO", 1301.66, 89, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/SALTO/AC-SALTO-XS4-ESCUTION-ANSI-03242021.jpg", "SALTO XS4 Electronic Escutcheon Ax666; For ANSI mortise locks; 2 handles; any type; electronic do not disturb system; built in mechanical cylinder with audit housing; (mechanical cylinder not included). Technology: Mifare + Bluetooth LE + HSE; finishes and handles.(Available only in the USA and Canada)"],
  ["AC-SALTO-XS4-PB-KIT-CR-KPB17IM", "SALTO KPB17IM", "SALTO", 456.19, 97, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "XS4 PB Kit|Corbin Russwin ED2500 & Yale 7100 - SVN|satin stainless (Available only in the USA and Canada)"],
  ["AC-SALTO-XS4-PB-KIT-SG-KPB08IM", "SALTO KPB08IM", "SALTO", 456.19, 167, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "XS4 PB Kit| SARGENT 8888 - SVN|satin stainless (Available only in the USA and Canada)"],
  ["AC-SALTO-XS4-PB-KIT-VD-KPB03IM", "SALTO KPB03IM", "SALTO", 456.19, 113, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "XS4 PB Kit|Salto PBF110|Von Duprin series 98 & 99 - SVN|satin stainless (Available only in the USA and Canada)"],
  ["AC-SALTO-XS4-PB-KIT-VD-KPB04IM", "SALTO KPB04IM", "SALTO", 456.19, 83, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "XS4 PB Kit|Von Duprin series 98/9927 & 98/9957 - SVN|satin stainless (Available only in the USA and Canada)"],
  ["AC-HID-EL-DYMO-30856", "HID EL-DYMO-30856", "HID", 98.64, 81, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/EL-DYMO-30856-Lbl_08212020.jpg", "DYMO 30856 non-adhesive badges (250)(HID Part Number: EL-DYMO-30856)"],
  ["AC-HID-EL-DYMO-30911", "HID EL-DYMO-30911", "HID", 169.1, 118, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/EL-DYMO-30911-Lbl_08212020.jpg", "DYMO 30911 adhesive self-expiring badges (250)(HID Part Number: EL-DYMO-30911)"],
  ["AC-HID-EL-K12-SVM", "HID EL-K12-SVM", "HID", 3228.92, 82, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/easylobby-dvd-case-mockup_08212020.jpg", "1 copy of SVM software; includes Free Administrator software (admin/reporting) Special bundle package for K-12 schools only (HID # EL-K12-SVM)(HID Part Number: EL-K12-SVM)"],
  ["AC-SAFR-ACCS-SFR-SCEXWAR-2YR", "AC-SAFR-ACCS-SFR-SCEXWAR-2YR", "Accessories", 552.7, 115, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg", ""],
  ["AC-SAFR-ACCS-SFR-SCFMA-100", "AC-SAFR-ACCS-SFR-SCFMA-100", "Accessories", 236.08, 178, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg", ""],
  ["AC-SAFR-ACCS-SFR-SCWDG-20", "AC-SAFR-ACCS-SFR-SCWDG-20", "Accessories", 127.76, 114, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg", ""],
  ["AC-SAFR-RDR-SFR-SC100", "AC-SAFR-RDR-SFR-SC100", "Accessories", 2785.73, 147, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg", ""],
  ["AC-SW-ACM-DEMO-30D-6-P", "Access Control Manager 6 30 Day Demo License", "Accessories", 0, 103, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 License 30 Day Demonstration: includes licensing for  Badging; Exacq; Milestone; one Bosch intrusion panel; ViRIDI BEManager integration; Replication; Hot Stand By Auto Failover; SQL collaboration; Oracle collaboration; LDAP collaboration; XML collaboration; REST collaboration"],
  ["AC-SW-LIC-16RCU-6-P", "Access Control Manager 6 Sixteen Doors Expansion Software Licenses", "Accessories", 3060, 173, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Additional 16 Doors Expansion Software Licenses for Avigilon Access Control Manager Professional; Enterprise; Enterprise Plus & Virtual"],
  ["AC-SW-LIC-AF-6-P", "Access Control Manager 6 Auto Failover License (per appliance)", "Accessories", 6548.4, 75, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 Hot Standby - Auto Failover Software License (per Appliance) includes AC-SW-LIC-REP-6-P; Requires duplicate licensing for failover appliance"],
  ["AC-SW-LIC-BDGE-6-P", "Access Control Manager 6 Badging Software Licenses", "Accessories", 1090.97, 163, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Badging Software Licenses for Avigilon Access Control Manager Professional; Enterprise; Enterprise Plus & Virtual"],
  ["AC-SW-LIC-PART-6-P", "Access Control Manager 6 Partitioning License for additional partitions", "Accessories", 5457.43, 128, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 Partitioning License for additional partitions (per appliance)"],
  ["AC-SW-LIC-REP-6-P", "Access Control Manager 6 Replication License (per appliance)", "Accessories", 4365.17, 138, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 Multi-Appliance Replication Software License (per appliance)"],
  ["AC-SW-LIC-REST-6-P", "Access Control Manager 6 REST Connectivity Software License", "Accessories", 1090.97, 85, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 REST Connectivity Software License (per appliance)"],
  ["AC-SW-LIC-WIRELESS-LOCK-6-P", "Access Control Manager 6 Wireless Lock Connectivity Software License", "Accessories", 240, 118, "http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Access Control Manager 6 Wireless Lock Connectivity Software License for each wireless locks not purchased from Motorola Solutions"],
  ["UA-SW-LIC-1000DOORS", "UA7 1000 Door License", "UA7", 120000, 80, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "UA7 1000 Door License"],
  ["UA-SW-LIC-100DOORS", "UA7 100 Door License", "UA7", 16080, 140, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "UA7 100 Door License"],
  ["UA-SW-LIC-10DOORS", "UA7 10 Door License", "UA7", 1980, 107, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg", "UA7 10 Door License"],
  ["UA-SW-LIC-1DOORS", "UA7 1 Door License", "UA7", 240, 176, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "UA7 1 Door License"],
  ["UA-SW-LIC-ALL-IN-ADDON", "UA7 All-in Add-on", "UA7", 7200, 150, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "Includes the Availability & Network; Situational Awareness; Data & Templates; and Integrations Add-on"],
  ["UA-SW-LIC-AVAILABILITY-ADDON", "UA7 Availability and Network Add-on", "UA7", 2400, 149, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "UA7 Availability and Network Add-on"],
  ["UA-SW-LIC-AWARENESS-ADDON", "UA7 Situational Awareness Add-on", "UA7", 2400, 183, "https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Access-Control-Hardware-and-Accessories_070720.jpg", "UA7 Situational Awareness Add-on"],
];

const mappedAccessories: Product[] = RAW_ACCESSORIES_DATA.map((row, index) => {
  const [sku, name, brand, priceUSD, stock, image, description] = row;
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + sku.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return {
    id: `sp-prod-${index + 1}`,
    sku,
    name,
    slug,
    brand,
    category: "Electrical Systems",
    subcategory: "Accessories",
    priceUSD,
    priceNGN: priceUSD * 1500,
    description,
    images: [image],
    specifications: [
      { label: "SKU", value: sku },
      { label: "Brand", value: brand },
      { label: "Category", value: "Accessories" }
    ],
    stock,
    oem: brand,
    productType: "Enterprise",
    featured: index < 6,
    popular: index % 4 === 0,
    downloads: [
      { title: `${name} Technical Datasheet`, type: "Data Sheet", url: "#" }
    ],
    reviews: []
  };
});

export const PTZ_CAMERA_PRODUCTS: Product[] = [
  {
    id: "sp-ptz-1",
    sku: "H5AEX-PTZ-WARR-EXTEND-2YR",
    name: "2 year extended warranty for H5 Explosion Protected PTZ Camera",
    slug: "2-year-extended-warranty-for-h5-explosion-protected-ptz-camera-h5aex-ptz-warr-extend-2yr",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "PTZ Camera",
    priceUSD: 4081.49,
    priceNGN: 4081.49 * 1500,
    description: "2 year extended warranty for H5 Explosion Protected PTZ camera. Must be purchased at the same time as the camera.",
    images: ["https://i.ibb.co/Rp6sNnnF/images-27.jpg"],
    specifications: [
      { label: "SKU", value: "H5AEX-PTZ-WARR-EXTEND-2YR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "PTZ Camera" }
    ],
    stock: 132,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: true,
    popular: true,
    downloads: [
      { title: "Extended Warranty datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-ptz-2",
    sku: "PTZMH-ACCS-CABL1",
    name: "Replacement Cable Accessories and Adapter for H4 PTZ",
    slug: "replacement-cable-accessories-and-adapter-for-h4-ptz-ptzmh-accs-cabl1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "PTZ Camera",
    priceUSD: 74.34,
    priceNGN: 74.34 * 1500,
    description: "Replacement cable accessory and adapter kit for H4 PTZ and HD Multisensor (H3-xMH) pendant mount cameras. Includes waterproof RJ45 connector; M8 2-pin male cable and M12 12-pin female cable.",
    images: ["https://i.ibb.co/XZGbtRpd/images-28.jpg"],
    specifications: [
      { label: "SKU", value: "PTZMH-ACCS-CABL1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "PTZ Camera" }
    ],
    stock: 180,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Replacement Cable manual", type: "Manual", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-ptz-3",
    sku: "PTZMH-DC-CPNL1",
    name: "Metal Ceiling Panel for H4 PTZ",
    slug: "metal-ceiling-panel-for-h4-ptz-ptzmh-dc-cpnl1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "PTZ Camera",
    priceUSD: 133.81,
    priceNGN: 133.81 * 1500,
    description: "Metal Ceiling panel for H4 PTZ and HD Multisensor cameras.",
    images: ["https://i.ibb.co/ns3wxBDm/images-29.jpg"],
    specifications: [
      { label: "SKU", value: "PTZMH-DC-CPNL1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "PTZ Camera" }
    ],
    stock: 103,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Ceiling Panel datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  }
];

export const THERMAL_CAMERA_PRODUCTS: Product[] = [
  {
    id: "sp-thermal-1",
    sku: "320SH4ATHC-WARR-EXTEND-1YR",
    name: "H4 QVGA Thermal Camera 1 Year Extended Warranty",
    slug: "h4-qvga-thermal-camera-1-year-extended-warranty-320sh4athc-warr-extend-1yr",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Thermal Camera",
    priceUSD: 584.53,
    priceNGN: 584.53 * 1500,
    description: "Extended Warranty for QVGA H4 Thermal cameras; 1 year extension",
    images: ["https://i.ibb.co/6JG3ZFvX/images-36.jpg"],
    specifications: [
      { label: "SKU", value: "320SH4ATHC-WARR-EXTEND-1YR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Thermal Camera" }
    ],
    stock: 168,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Extended Warranty datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-thermal-2",
    sku: "320SH4ATHC-WARR-EXTEND-2YR",
    name: "H4 QVGA Thermal Camera 2 Years Extended Warranty",
    slug: "h4-qvga-thermal-camera-2-years-extended-warranty-320sh4athc-warr-extend-2yr",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Thermal Camera",
    priceUSD: 1167.59,
    priceNGN: 1167.59 * 1500,
    description: "Extended Warranty for QVGA H4 Thermal cameras; 2 years extension",
    images: ["https://i.ibb.co/1YHZ54VG/images-35.jpg"],
    specifications: [
      { label: "SKU", value: "320SH4ATHC-WARR-EXTEND-2YR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Thermal Camera" }
    ],
    stock: 161,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Extended Warranty datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-thermal-3",
    sku: "640SH4ATHC-WARR-EXTEND-1YR",
    name: "H4 VGA Thermal Camera 1 Year Extended Warranty",
    slug: "h4-vga-thermal-camera-1-year-extended-warranty-640sh4athc-warr-extend-1yr",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Thermal Camera",
    priceUSD: 1048.07,
    priceNGN: 1048.07 * 1500,
    description: "Extended Warranty for VGA H4 Thermal cameras; 1 year extension",
    images: ["https://i.ibb.co/pj9DJ58d/images-34.jpg"],
    specifications: [
      { label: "SKU", value: "640SH4ATHC-WARR-EXTEND-1YR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Thermal Camera" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Extended Warranty datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-thermal-4",
    sku: "640SH4ATHC-WARR-EXTEND-2YR",
    name: "H4 VGA Thermal Camera 2 Years Extended Warranty",
    slug: "h4-vga-thermal-camera-2-years-extended-warranty-640sh4athc-warr-extend-2yr",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Thermal Camera",
    priceUSD: 2096.47,
    priceNGN: 2096.47 * 1500,
    description: "Extended Warranty for VGA H4 Thermal cameras; 2 years extension",
    images: ["https://i.ibb.co/cc39M7JG/images-33.jpg"],
    specifications: [
      { label: "SKU", value: "640SH4ATHC-WARR-EXTEND-2YR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Thermal Camera" }
    ],
    stock: 100,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Extended Warranty datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-thermal-5",
    sku: "640SH4ATHD-WARR-EXTEND-1YR",
    name: "H4 Thermal ETD cameras 1 Year Extended Warranty",
    slug: "h4-thermal-etd-cameras-1-year-extended-warranty-640sh4athd-warr-extend-1yr",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Thermal Camera",
    priceUSD: 565.57,
    priceNGN: 565.57 * 1500,
    description: "Extended Warranty for H4 Thermal ETD cameras; 1 year extension",
    images: ["https://i.ibb.co/XZWCsjxy/images-30.jpg"],
    specifications: [
      { label: "SKU", value: "640SH4ATHD-WARR-EXTEND-1YR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Thermal Camera" }
    ],
    stock: 183,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Extended Warranty datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-thermal-6",
    sku: "640SH4ATHD-WARR-EXTEND-2YR",
    name: "H4 Thermal ETD cameras 2 Year Extended Warranty",
    slug: "h4-thermal-etd-cameras-2-year-extended-warranty-640sh4athd-warr-extend-2yr",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Thermal Camera",
    priceUSD: 1131.17,
    priceNGN: 1131.17 * 1500,
    description: "Extended Warranty for H4 Thermal ETD cameras; 2 year extension",
    images: ["https://i.ibb.co/pj9DJ58d/images-34.jpg"],
    specifications: [
      { label: "SKU", value: "640SH4ATHD-WARR-EXTEND-2YR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Thermal Camera" }
    ],
    stock: 149,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Extended Warranty datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  }
];

export const BOX_CAMERA_PRODUCTS: Product[] = [
  {
    id: "sp-box-1",
    sku: "LEF1506005TA",
    name: "Tamron 150-600mm f/5-6.3 VC G2 Lens for Pro Cameras",
    slug: "tamron-150-600mm-f-5-6-3-vc-g2-lens-for-pro-cameras-lef1506005ta",
    brand: "Tamron",
    category: "Electronic Security",
    subcategory: "Box Camera",
    priceUSD: 3827.11,
    priceNGN: 3827.11 * 1500,
    description: "Tamron 150-600mm f/5-6.3 VC G2 Lens for Pro Camera",
    images: ["https://i.ibb.co/M5tDkFcC/images-38.jpg"],
    specifications: [
      { label: "SKU", value: "LEF1506005TA" },
      { label: "Brand", value: "Tamron" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Box Camera" }
    ],
    stock: 120,
    oem: "Tamron",
    productType: "Enterprise",
    featured: true,
    popular: true,
    downloads: [{ title: "Tamron 150-600mm Lens Datasheet", type: "Data Sheet", url: "#" }],
    reviews: []
  },
  {
    id: "sp-box-2",
    sku: "LEF163528CA2",
    name: "Canon 16-35mm f/2.8 Lens for Pro Cameras",
    slug: "canon-16-35mm-f-2-8-lens-for-pro-cameras-lef163528ca2",
    brand: "Canon",
    category: "Electronic Security",
    subcategory: "Box Camera",
    priceUSD: 5830.7,
    priceNGN: 5830.7 * 1500,
    description: "Canon 16-35mm f/2.8 Lens for Pro Cameras",
    images: ["https://i.ibb.co/kscJDBLL/images-39.jpg"],
    specifications: [
      { label: "SKU", value: "LEF163528CA2" },
      { label: "Brand", value: "Canon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Box Camera" }
    ],
    stock: 128,
    oem: "Canon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [{ title: "Canon 16-35mm Lens Datasheet", type: "Data Sheet", url: "#" }],
    reviews: []
  },
  {
    id: "sp-box-3",
    sku: "LEF20028CA",
    name: "Canon 200mm f/2.8 Lens for H4 Pro Cameras",
    slug: "canon-200mm-f-2-8-lens-for-h4-pro-cameras-lef20028ca",
    brand: "Canon",
    category: "Electronic Security",
    subcategory: "Box Camera",
    priceUSD: 2799.6,
    priceNGN: 2799.6 * 1500,
    description: "Canon 200mm f/2.8 lens. Compatible with Video H4 Pro cameras.",
    images: ["https://i.ibb.co/b5dZDb1s/images-41.jpg"],
    specifications: [
      { label: "SKU", value: "LEF20028CA" },
      { label: "Brand", value: "Canon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Box Camera" }
    ],
    stock: 133,
    oem: "Canon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [{ title: "Canon 200mm Lens Datasheet", type: "Data Sheet", url: "#" }],
    reviews: []
  },
  {
    id: "sp-box-4",
    sku: "LEF247028TA2",
    name: "Tamron 24-70mm f/2.8 VC Lens for Pro Cameras",
    slug: "tamron-24-70mm-f-2-8-vc-lens-for-pro-cameras-lef247028ta2",
    brand: "Tamron",
    category: "Electronic Security",
    subcategory: "Box Camera",
    priceUSD: 3278.33,
    priceNGN: 3278.33 * 1500,
    description: "Tamron 24-70mm f/2.8 VC Lens for Pro Cameras",
    images: ["https://i.ibb.co/M5tDkFcC/images-38.jpg"],
    specifications: [
      { label: "SKU", value: "LEF247028TA2" },
      { label: "Brand", value: "Tamron" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Box Camera" }
    ],
    stock: 90,
    oem: "Tamron",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [{ title: "Tamron 24-70mm Lens Datasheet", type: "Data Sheet", url: "#" }],
    reviews: []
  },
  {
    id: "sp-box-5",
    sku: "LEF3514TA",
    name: "Tamron 35mm f/1.4 Lens for Pro Cameras",
    slug: "tamron-35mm-f-1-4-lens-for-pro-cameras-lef3514ta",
    brand: "Tamron",
    category: "Electronic Security",
    subcategory: "Box Camera",
    priceUSD: 2456.6,
    priceNGN: 2456.6 * 1500,
    description: "Tamron 35mm f/1.4 Lens for Pro Cameras",
    images: ["https://i.ibb.co/M5tDkFcC/images-38.jpg"],
    specifications: [
      { label: "SKU", value: "LEF3514TA" },
      { label: "Brand", value: "Tamron" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Box Camera" }
    ],
    stock: 182,
    oem: "Tamron",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [{ title: "Tamron 35mm Lens Datasheet", type: "Data Sheet", url: "#" }],
    reviews: []
  },
  {
    id: "sp-box-6",
    sku: "LEF5018CA2",
    name: "Canon 50mm f/1.8 Lens for H4 Pro Cameras",
    slug: "canon-50mm-f-1-8-lens-for-h4-pro-cameras-lef5018ca2",
    brand: "Canon",
    category: "Electronic Security",
    subcategory: "Box Camera",
    priceUSD: 466.46,
    priceNGN: 466.46 * 1500,
    description: "Canon 50mm f/1.8 lens. Compatible with Video H4 Pro cameras.",
    images: ["https://i.ibb.co/kscJDBLL/images-39.jpg"],
    specifications: [
      { label: "SKU", value: "LEF5018CA2" },
      { label: "Brand", value: "Canon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Box Camera" }
    ],
    stock: 170,
    oem: "Canon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [{ title: "Canon 50mm Lens Datasheet", type: "Data Sheet", url: "#" }],
    reviews: []
  },
  {
    id: "sp-box-7",
    sku: "LEF7020028CA3",
    name: "Canon 70-200mm f/2.8 III Lens",
    slug: "canon-70-200mm-f-2-8-iii-lens-lef7020028ca3",
    brand: "Canon",
    category: "Electronic Security",
    subcategory: "Box Camera",
    priceUSD: 4781.7,
    priceNGN: 4781.7 * 1500,
    description: "Canon 70-200mm f/2.8 III Lens",
    images: ["https://i.ibb.co/b5dZDb1s/images-41.jpg"],
    specifications: [
      { label: "SKU", value: "LEF7020028CA3" },
      { label: "Brand", value: "Canon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Box Camera" }
    ],
    stock: 92,
    oem: "Canon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [{ title: "Canon 70-200mm Lens Datasheet", type: "Data Sheet", url: "#" }],
    reviews: []
  },
  {
    id: "sp-box-8",
    sku: "LEFS183518SI",
    name: "Sigma 18-35mm f/1.8 Lens for Pro Cameras",
    slug: "sigma-18-35mm-f-1-8-lens-for-pro-cameras-lefs183518si",
    brand: "Sigma",
    category: "Electronic Security",
    subcategory: "Box Camera",
    priceUSD: 2241.46,
    priceNGN: 2241.46 * 1500,
    description: "Sigma 18-35mm f/1.8 Lens for Pro Cameras. The lens is only compatible with 8-16MP H4 Pro cameras or 8-26MP H5 Pro cameras.",
    images: ["https://i.ibb.co/cKR3LWqZ/images-37.jpg"],
    specifications: [
      { label: "SKU", value: "LEFS183518SI" },
      { label: "Brand", value: "Sigma" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Box Camera" }
    ],
    stock: 123,
    oem: "Sigma",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [{ title: "Sigma 18-35mm Lens Datasheet", type: "Data Sheet", url: "#" }],
    reviews: []
  },
  {
    id: "sp-box-9",
    sku: "RLEF20028CA",
    name: "Refurbished; Canon 200mm f/2.8L Lens",
    slug: "refurbished-canon-200mm-f-2-8l-lens-rlef20028ca",
    brand: "Canon",
    category: "Electronic Security",
    subcategory: "Box Camera",
    priceUSD: 1365.84,
    priceNGN: 1365.84 * 1500,
    description: "Refurbished Canon 200mm f/2.8 L lens. Lens may be missing original packaging and documentation. Lens may also contain cosmetic scratches which will not impair its functionality. Available in limited quantities.",
    images: ["https://i.ibb.co/b5dZDb1s/images-41.jpg"],
    specifications: [
      { label: "SKU", value: "RLEF20028CA" },
      { label: "Brand", value: "Canon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Box Camera" }
    ],
    stock: 166,
    oem: "Canon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [{ title: "Canon 200mm Refurbished Lens Datasheet", type: "Data Sheet", url: "#" }],
    reviews: []
  },
  {
    id: "sp-box-10",
    sku: "RLEF7020028CA",
    name: "Refurbished; Canon 70-200mm f/2.8L Lens",
    slug: "refurbished-canon-70-200mm-f-2-8l-lens-rlef7020028ca",
    brand: "Canon",
    category: "Electronic Security",
    subcategory: "Box Camera",
    priceUSD: 2277.97,
    priceNGN: 2277.97 * 1500,
    description: "Refurbished Canon 70-200mm f/2.8 L lens. Lens may be missing original packaging and documentation. Lens may also contain cosmetic scratches which will not impair its functionality. Available in limited quantities.",
    images: ["https://i.ibb.co/spJWYPTp/images-40.jpg"],
    specifications: [
      { label: "SKU", value: "RLEF7020028CA" },
      { label: "Brand", value: "Canon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Box Camera" }
    ],
    stock: 176,
    oem: "Canon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [{ title: "Canon 70-200mm Refurbished Lens Datasheet", type: "Data Sheet", url: "#" }],
    reviews: []
  },
  {
    id: "sp-box-11",
    sku: "AG3Z2812KCS-MPWIR-MSI",
    name: "LENS; CS; 2.8-8.5mm f1.2; 1/2.8; 6MP",
    slug: "lens-cs-2-8-8-5mm-f1-2-1-2-8-6mp-ag3z2812kcs-mpwir-msi",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Box Camera",
    priceUSD: 289.8,
    priceNGN: 289.8 * 1500,
    description: "LENS; CS; 2.8-8.5mm f1.2; 1/2.8; 6MP",
    images: ["https://i.ibb.co/cKR3LWqZ/images-37.jpg"],
    specifications: [
      { label: "SKU", value: "AG3Z2812KCS-MPWIR-MSI" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Box Camera" }
    ],
    stock: 101,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [{ title: "LENS CS Datasheet", type: "Data Sheet", url: "#" }],
    reviews: []
  },
  {
    id: "sp-box-12",
    sku: "AG3Z2812TCS-MPWIR-MSI",
    name: "LENS; iCS; 2.8-8.5mm f1.2; 1/2.8; 6MP",
    slug: "lens-ics-2-8-8-5mm-f1-2-1-2-8-6mp-ag3z2812tcs-mpwir-msi",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Box Camera",
    priceUSD: 381.78,
    priceNGN: 381.78 * 1500,
    description: "LENS; iCS; 2.8-8.5mm f1.2; 1/2.8; 6MP",
    images: ["https://i.ibb.co/spJWYPTp/images-40.jpg"],
    specifications: [
      { label: "SKU", value: "AG3Z2812TCS-MPWIR-MSI" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Box Camera" }
    ],
    stock: 86,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [{ title: "LENS iCS Datasheet", type: "Data Sheet", url: "#" }],
    reviews: []
  },
  {
    id: "sp-box-13",
    sku: "EG3Z3915KCS-MPWIR-MSI",
    name: "LENS; CS; 3.9-10mm f1.5; 1/1.8; 4K",
    slug: "lens-cs-3-9-10mm-f1-5-1-1-8-4k-eg3z3915kcs-mpwir-msi",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Box Camera",
    priceUSD: 327.6,
    priceNGN: 327.6 * 1500,
    description: "LENS; CS; 3.9-10mm f1.5; 1/1.8; 4K",
    images: ["https://i.ibb.co/spJWYPTp/images-40.jpg"],
    specifications: [
      { label: "SKU", value: "EG3Z3915KCS-MPWIR-MSI" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Box Camera" }
    ],
    stock: 119,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [{ title: "LENS CS 4K Datasheet", type: "Data Sheet", url: "#" }],
    reviews: []
  },
  {
    id: "sp-box-14",
    sku: "EG3Z3915TCS-MPWIR-MSI",
    name: "LENS; iCS; 3.9-10mm f1.5; 1/1.8; 4K",
    slug: "lens-ics-3-9-10mm-f1-5-1-1-8-4k-eg3z3915tcs-mpwir-msi",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Box Camera",
    priceUSD: 478.8,
    priceNGN: 478.8 * 1500,
    description: "LENS; iCS; 3.9-10mm f1.5; 1/1.8; 4K",
    images: ["https://i.ibb.co/b5dZDb1s/images-41.jpg"],
    specifications: [
      { label: "SKU", value: "EG3Z3915TCS-MPWIR-MSI" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Box Camera" }
    ],
    stock: 112,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [{ title: "LENS iCS 4K Datasheet", type: "Data Sheet", url: "#" }],
    reviews: []
  },
  {
    id: "sp-box-15",
    sku: "EG6Z0915TCS-MPWIR-MSI",
    name: "LENS; iCS; 9-50mm f1.5; 1/1.8; 4K",
    slug: "lens-ics-9-50mm-f1-5-1-1-8-4k-eg6z0915tcs-mpwir-msi",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Box Camera",
    priceUSD: 718.2,
    priceNGN: 718.2 * 1500,
    description: "LENS; iCS; 9-50mm f1.5; 1/1.8; 4K",
    images: ["https://i.ibb.co/cKR3LWqZ/images-37.jpg"],
    specifications: [
      { label: "SKU", value: "EG6Z0915TCS-MPWIR-MSI" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Box Camera" }
    ],
    stock: 161,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [{ title: "LENS iCS Long Range Datasheet", type: "Data Sheet", url: "#" }],
    reviews: []
  },
  {
    id: "sp-box-16",
    sku: "FG50020P.IR-MSI",
    name: "LENS; CS; 3.4-9.85mm f1.86; 1/2.7; 5MP",
    slug: "lens-cs-3-4-9-85mm-f1-86-1-2-7-5mp-fg50020p-ir-msi",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Box Camera",
    priceUSD: 151.2,
    priceNGN: 151.2 * 1500,
    description: "LENS; CS; 3.4-9.85mm f1.86; 1/2.7; 5MP",
    images: ["https://i.ibb.co/cKR3LWqZ/images-37.jpg"],
    specifications: [
      { label: "SKU", value: "FG50020P.IR-MSI" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Box Camera" }
    ],
    stock: 134,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [{ title: "LENS CS 5MP Datasheet", type: "Data Sheet", url: "#" }],
    reviews: []
  },
  {
    id: "sp-box-17",
    sku: "H4PRO-WARR-EXTEND-1YR",
    name: "H4 Pro 1 Years Extended Warranty",
    slug: "h4-pro-1-years-extended-warranty-h4pro-warr-extend-1yr",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Box Camera",
    priceUSD: 792.97,
    priceNGN: 792.97 * 1500,
    description: "Extended Warranty for H4 Pro camera; 1 year extension",
    images: ["https://i.ibb.co/cKR3LWqZ/images-37.jpg"],
    specifications: [
      { label: "SKU", value: "H4PRO-WARR-EXTEND-1YR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Box Camera" }
    ],
    stock: 166,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [{ title: "Warranty Extended 1 Year Datasheet", type: "Data Sheet", url: "#" }],
    reviews: []
  },
  {
    id: "sp-box-18",
    sku: "H4PRO-WARR-EXTEND-2YR",
    name: "H4 Pro 2 Year Extended Warranty",
    slug: "h4-pro-2-year-extended-warranty-h4pro-warr-extend-2yr",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Box Camera",
    priceUSD: 1586.29,
    priceNGN: 1586.29 * 1500,
    description: "Extended Warranty for H4 Pro camera; 2 years extension",
    images: ["https://i.ibb.co/cKR3LWqZ/images-37.jpg"],
    specifications: [
      { label: "SKU", value: "H4PRO-WARR-EXTEND-2YR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Box Camera" }
    ],
    stock: 120,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [{ title: "Warranty Extended 2 Year Datasheet", type: "Data Sheet", url: "#" }],
    reviews: []
  },
  {
    id: "sp-box-19",
    sku: "HV03610P.IR-MSI",
    name: "LENS; CS; 4.3-9.6mm f1.8; 1/1.8; 4K",
    slug: "lens-cs-4-3-9-6mm-f1-8-1-1-8-4k-hv03610p-ir-msi",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Box Camera",
    priceUSD: 214.2,
    priceNGN: 214.2 * 1500,
    description: "LENS; CS; 4.3-9.6mm f1.8; 1/1.8; 4K",
    images: ["https://i.ibb.co/kscJDBLL/images-39.jpg"],
    specifications: [
      { label: "SKU", value: "HV03610P.IR-MSI" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Box Camera" }
    ],
    stock: 114,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [{ title: "LENS CS 4K Variant Datasheet", type: "Data Sheet", url: "#" }],
    reviews: []
  },
  {
    id: "sp-box-20",
    sku: "M117VG3817IR-MSI",
    name: "LENS; CS; 3.8-17mm f1.4; 1/1.7; 4K",
    slug: "lens-cs-3-8-17mm-f1-4-1-1-7-4k-m117vg3817ir-msi",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Box Camera",
    priceUSD: 403.2,
    priceNGN: 403.2 * 1500,
    description: "LENS; CS; 3.8-17mm f1.4; 1/1.7; 4K",
    images: ["https://i.ibb.co/cKR3LWqZ/images-37.jpg"],
    specifications: [
      { label: "SKU", value: "M117VG3817IR-MSI" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Box Camera" }
    ],
    stock: 145,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [{ title: "LENS CS High-Sensitivity Datasheet", type: "Data Sheet", url: "#" }],
    reviews: []
  },
  {
    id: "sp-box-21",
    sku: "M13VG2713IR-MSI",
    name: "LENS; CS; 2.7-13mm f1.4; 1/2.7; 3MP",
    slug: "lens-cs-2-7-13mm-f1-4-1-2-7-3mp-m13vg2713ir-msi",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Box Camera",
    priceUSD: 189,
    priceNGN: 189 * 1500,
    description: "LENS; CS; 2.7-13mm f1.4; 1/2.7; 3MP",
    images: ["https://i.ibb.co/cKR3LWqZ/images-37.jpg"],
    specifications: [
      { label: "SKU", value: "M13VG2713IR-MSI" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Box Camera" }
    ],
    stock: 87,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [{ title: "LENS CS 3MP Datasheet", type: "Data Sheet", url: "#" }],
    reviews: []
  },
  {
    id: "sp-box-22",
    sku: "SL1250P-MSI",
    name: "LENS; CS; 12-50mm f1.8; 1/1.7; 4K",
    slug: "lens-cs-12-50mm-f1-8-1-1-7-4k-sl1250p-msi",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Box Camera",
    priceUSD: 428.4,
    priceNGN: 428.4 * 1500,
    description: "LENS; CS; 12-50mm f1.8; 1/1.7; 4K",
    images: ["https://i.ibb.co/cKR3LWqZ/images-37.jpg"],
    specifications: [
      { label: "SKU", value: "SL1250P-MSI" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Box Camera" }
    ],
    stock: 175,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [{ title: "LENS CS Telephoto Datasheet", type: "Data Sheet", url: "#" }],
    reviews: []
  },
  {
    id: "sp-box-23",
    sku: "SL183A-MSI",
    name: "LENS; CS; 1.8-3mm f1.8; 1/2.7; 5MP",
    slug: "lens-cs-1-8-3mm-f1-8-1-2-7-5mp-sl183a-msi",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Box Camera",
    priceUSD: 457.38,
    priceNGN: 457.38 * 1500,
    description: "LENS; CS; 1.8-3mm f1.8; 1/2.7; 5MP",
    images: ["https://i.ibb.co/spJWYPTp/images-40.jpg"],
    specifications: [
      { label: "SKU", value: "SL183A-MSI" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Box Camera" }
    ],
    stock: 100,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [{ title: "LENS CS Wide Angle Datasheet", type: "Data Sheet", url: "#" }],
    reviews: []
  },
  {
    id: "sp-box-24",
    sku: "SL940P-MSI",
    name: "LENS; CS; 9-40mm f1.5; 1/2.7; 5MP",
    slug: "lens-cs-9-40mm-f1-5-1-2-7-5mp-sl940p-msi",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Box Camera",
    priceUSD: 457.38,
    priceNGN: 457.38 * 1500,
    description: "LENS; CS; 9-40mm f1.5; 1/2.7; 5MP",
    images: ["https://i.ibb.co/cKR3LWqZ/images-37.jpg"],
    specifications: [
      { label: "SKU", value: "SL940P-MSI" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Box Camera" }
    ],
    stock: 76,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [{ title: "LENS CS Varifocal Datasheet", type: "Data Sheet", url: "#" }],
    reviews: []
  },
  {
    id: "sp-box-25",
    sku: "16C-H5PRO-B",
    name: "16 MP H5 Pro Box Camera",
    slug: "16-mp-h5-pro-box-camera-16c-h5pro-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Box Camera",
    priceUSD: 12411,
    priceNGN: 12411 * 1500,
    description: "5K (16 MP) H5 Pro Camera. Lens and housing not included.",
    images: ["https://i.ibb.co/spJWYPTp/images-40.jpg"],
    specifications: [
      { label: "SKU", value: "16C-H5PRO-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Box Camera" }
    ],
    stock: 184,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: true,
    popular: true,
    downloads: [{ title: "16 MP H5 Pro Box Camera Datasheet", type: "Data Sheet", url: "#" }],
    reviews: []
  },
  {
    id: "sp-box-26",
    sku: "26C-H5PRO-B",
    name: "26 MP H5 Pro Box Camera",
    slug: "26-mp-h5-pro-box-camera-26c-h5pro-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Box Camera",
    priceUSD: 14893.2,
    priceNGN: 14893.2 * 1500,
    description: "6.25K (26 MP) H5 Pro Camera. Lens and housing not included.",
    images: ["https://i.ibb.co/cKR3LWqZ/images-37.jpg"],
    specifications: [
      { label: "SKU", value: "26C-H5PRO-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Box Camera" }
    ],
    stock: 74,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [{ title: "26 MP H5 Pro Box Camera Datasheet", type: "Data Sheet", url: "#" }],
    reviews: []
  },
  {
    id: "sp-box-27",
    sku: "40C-H5PRO-B",
    name: "40 MP H5 Pro Box Camera",
    slug: "40-mp-h5-pro-box-camera-40c-h5pro-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Box Camera",
    priceUSD: 18203.22,
    priceNGN: 18203.22 * 1500,
    description: "8K (40 MP) H5 Pro Camera. Lens and housing not included.",
    images: ["https://i.ibb.co/cKR3LWqZ/images-37.jpg"],
    specifications: [
      { label: "SKU", value: "40C-H5PRO-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Box Camera" }
    ],
    stock: 153,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [{ title: "40 MP H5 Pro Box Camera Datasheet", type: "Data Sheet", url: "#" }],
    reviews: []
  },
  {
    id: "sp-box-28",
    sku: "61C-H5PRO-B",
    name: "61 MP H5 Pro Box Camera",
    slug: "61-mp-h5-pro-box-camera-61c-h5pro-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Box Camera",
    priceUSD: 24822,
    priceNGN: 24822 * 1500,
    description: "10K (61 MP) H5 Pro Camera. Lens and housing not included.",
    images: ["https://i.ibb.co/M5tDkFcC/images-38.jpg"],
    specifications: [
      { label: "SKU", value: "61C-H5PRO-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Box Camera" }
    ],
    stock: 182,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [{ title: "61 MP H5 Pro Box Camera Datasheet", type: "Data Sheet", url: "#" }],
    reviews: []
  },
  {
    id: "sp-box-29",
    sku: "8C-H5PRO-B",
    name: "8 MP H5 Pro Box Camera",
    slug: "8-mp-h5-pro-box-camera-8c-h5pro-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Box Camera",
    priceUSD: 4964.4,
    priceNGN: 4964.4 * 1500,
    description: "4K (8 MP) H5 Pro Camera. Lens and housing not included.",
    images: ["https://i.ibb.co/cKR3LWqZ/images-37.jpg"],
    specifications: [
      { label: "SKU", value: "8C-H5PRO-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Box Camera" }
    ],
    stock: 71,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [{ title: "8 MP H5 Pro Box Camera Datasheet", type: "Data Sheet", url: "#" }],
    reviews: []
  },
  {
    id: "sp-box-30",
    sku: "6.0C-H6X-B",
    name: "6MP H6X Box Camera Compatible with CS/iCS Lens",
    slug: "6mp-h6x-box-camera-compatible-with-cs-ics-lens-6-0c-h6x-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Box Camera",
    priceUSD: 1842.12,
    priceNGN: 1842.12 * 1500,
    description: "6MP H6X Box Camera Compatible with CS/iCS Lens",
    images: ["https://i.ibb.co/M5tDkFcC/images-38.jpg"],
    specifications: [
      { label: "SKU", value: "6.0C-H6X-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Box Camera" }
    ],
    stock: 182,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [{ title: "6MP H6X Box Camera Datasheet", type: "Data Sheet", url: "#" }],
    reviews: []
  },
  {
    id: "sp-box-31",
    sku: "8.0C-H6X-B",
    name: "8MP H6X Box Camera Compatible with CS/iCS Lens",
    slug: "8mp-h6x-box-camera-compatible-with-cs-ics-lens-8-0c-h6x-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Box Camera",
    priceUSD: 2174.76,
    priceNGN: 2174.76 * 1500,
    description: "8MP H6X Box Camera Compatible with CS/iCS Lens",
    images: ["https://i.ibb.co/M5tDkFcC/images-38.jpg"],
    specifications: [
      { label: "SKU", value: "8.0C-H6X-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Box Camera" }
    ],
    stock: 79,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [{ title: "8MP H6X Box Camera Datasheet", type: "Data Sheet", url: "#" }],
    reviews: []
  },
  {
    id: "sp-box-32",
    sku: "2.0C-H5A-B1",
    name: "2MP H5A Box Camera with 4.7-84.6mm Lens",
    slug: "2mp-h5a-box-camera-with-4-7-84-6mm-lens-2-0c-h5a-b1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Box Camera",
    priceUSD: 1398.6,
    priceNGN: 1398.6 * 1500,
    description: "2.0 MP (1080p) WDR; LightCatcher; Day/Night; 4.7-84.6mm f/1.6 lens; Next-Generation Analytics",
    images: ["https://i.ibb.co/cKR3LWqZ/images-37.jpg"],
    specifications: [
      { label: "SKU", value: "2.0C-H5A-B1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Box Camera" }
    ],
    stock: 71,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [{ title: "2MP H5A Box Camera Datasheet", type: "Data Sheet", url: "#" }],
    reviews: []
  },
  {
    id: "sp-box-33",
    sku: "H4-BO-JBOX1",
    name: "Bullet Junction Box for H5A Bullet; H4A; H4A Thermal Bullet Cameras",
    slug: "bullet-junction-box-for-h5a-bullet-h4a-h4a-thermal-bullet-cameras-h4-bo-jbox1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Box Camera",
    priceUSD: 133.81,
    priceNGN: 133.81 * 1500,
    description: "Junction box for the H5A Bullet; H4A HD Bullet; H4SL HD Bullet; or H4 Thermal cameras.",
    images: ["https://i.ibb.co/M5tDkFcC/images-38.jpg"],
    specifications: [
      { label: "SKU", value: "H4-BO-JBOX1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Box Camera" }
    ],
    stock: 123,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [{ title: "Bullet Junction Box Datasheet", type: "Data Sheet", url: "#" }],
    reviews: []
  },
  {
    id: "sp-box-34",
    sku: "H5DH-DO-JBOX1",
    name: "Junction Box for H5A Dual Head Camera",
    slug: "junction-box-for-h5a-dual-head-camera-h5dh-do-jbox1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Box Camera",
    priceUSD: 133.81,
    priceNGN: 133.81 * 1500,
    description: "Junction Box for H5A Dual Head Camera",
    images: ["https://i.ibb.co/kscJDBLL/images-39.jpg"],
    specifications: [
      { label: "SKU", value: "H5DH-DO-JBOX1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Box Camera" }
    ],
    stock: 74,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [{ title: "Dual Head Junction Box Datasheet", type: "Data Sheet", url: "#" }],
    reviews: []
  }
];

export const BULLET_CAMERA_PRODUCTS: Product[] = [
  {
    id: "sp-bullet-1",
    sku: "H4-BO-DEMO1",
    name: "Demo Port Cover for H5A / H4A Bullet Cameras",
    slug: "demo-port-cover-for-h5a-h4a-bullet-cameras-h4-bo-demo1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 7.42,
    priceNGN: 7.42 * 1500,
    description: "Replacement H5A; H4 HD Bullet or H4 Thermal configuration port cover with a female 1/4-20 screw mount for use with tripod head for demo purposes only. Do not use for actual installation.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "H4-BO-DEMO1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 89,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Demo Port Cover for H5A / H4A Bullet Cameras Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-2",
    sku: "H4A-BO-SHLD1",
    name: "Replacement Sunshield for H5A/H4A Bullet Cameras",
    slug: "replacement-sunshield-for-h5a-h4a-bullet-cameras-h4a-bo-shld1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 22.3,
    priceNGN: 22.3 * 1500,
    description: "Replacement sun shield for H5A bullet cameras; H4A bullet cameras and H4 Thermal Cameras.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "H4A-BO-SHLD1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 103,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Replacement Sunshield for H5A/H4A Bullet Cameras Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-3",
    sku: "H6A-BO-SHLD1",
    name: "H6A; Bullet weathershield",
    slug: "h6a-bullet-weathershield-h6a-bo-shld1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 45.36,
    priceNGN: 45.36 * 1500,
    description: "H6A; Bullet weathershield",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "H6A-BO-SHLD1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 125,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "H6A; Bullet weathershield Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-4",
    sku: "H6A-BO2-SHLD1",
    name: "H6A; Long Bullet weathershield",
    slug: "h6a-long-bullet-weathershield-h6a-bo2-shld1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 45.36,
    priceNGN: 45.36 * 1500,
    description: "H6A; Long Bullet weathershield",
    images: ["https://i.ibb.co/QvzzL3Mr/images-20.jpg"],
    specifications: [
      { label: "SKU", value: "H6A-BO2-SHLD1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "H6A; Long Bullet weathershield Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-5",
    sku: "2.0C-H5A-BO2-IR",
    name: "2MP H5A Bullet Camera with 9-22mm Lens",
    slug: "2mp-h5a-bullet-camera-with-9-22mm-lens-2-0c-h5a-bo2-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 1721.16,
    priceNGN: 1721.16 * 1500,
    description: "2.0 MP (1080p) WDR; LightCatcher; 9-22mm f/1.6 P-iris lens; Integrated IR; Next-Generation Analytics",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/Avigilon_H5A-Camera_Bullet_Angle_062020.jpg"],
    specifications: [
      { label: "SKU", value: "2.0C-H5A-BO2-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 142,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: true,
    popular: false,
    downloads: [
      { title: "2MP H5A Bullet Camera with 9-22mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-6",
    sku: "2.0C-H6A-BO1-IR-B",
    name: "2MP H6A Bullet IR Camera with 2.8-12mm Lens",
    slug: "2mp-h6a-bullet-ir-camera-with-2-8-12mm-lens-2-0c-h6a-bo1-ir-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 1678.8,
    priceNGN: 1678.8 * 1500,
    description: "2MP H6A Bullet IR Camera with 2.8-12mm Lens",
    images: ["https://i.ibb.co/QvzzL3Mr/images-20.jpg"],
    specifications: [
      { label: "SKU", value: "2.0C-H6A-BO1-IR-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 174,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: true,
    downloads: [
      { title: "2MP H6A Bullet IR Camera with 2.8-12mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-7",
    sku: "2.0C-H6A-BO2-IR-B",
    name: "2MP H6A Bullet IR Camera with 33x Zoom",
    slug: "2mp-h6a-bullet-ir-camera-with-33x-zoom-2-0c-h6a-bo2-ir-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 2038.8,
    priceNGN: 2038.8 * 1500,
    description: "2MP H6A Bullet IR Camera with 33x Zoom",
    images: ["https://i.ibb.co/QvzzL3Mr/images-20.jpg"],
    specifications: [
      { label: "SKU", value: "2.0C-H6A-BO2-IR-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 171,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "2MP H6A Bullet IR Camera with 33x Zoom Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-8",
    sku: "4.0C-H6A-BO1-IR-B",
    name: "4MP H6A Bullet IR Camera with 4.4-9.3mm Lens",
    slug: "4mp-h6a-bullet-ir-camera-with-4-4-9-3mm-lens-4-0c-h6a-bo1-ir-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 1978.8,
    priceNGN: 1978.8 * 1500,
    description: "4MP H6A Bullet IR Camera with 4.4-9.3mm Lens",
    images: ["https://i.ibb.co/dwTKxWd6/images-19.jpg"],
    specifications: [
      { label: "SKU", value: "4.0C-H6A-BO1-IR-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 176,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "4MP H6A Bullet IR Camera with 4.4-9.3mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-9",
    sku: "4.0C-H6A-BO2-IR-B",
    name: "4MP H6A Bullet IR Camera with 31x Zoom",
    slug: "4mp-h6a-bullet-ir-camera-with-31x-zoom-4-0c-h6a-bo2-ir-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 2338.8,
    priceNGN: 2338.8 * 1500,
    description: "4MP H6A Bullet IR Camera with 31x Zoom",
    images: ["https://i.ibb.co/dwTKxWd6/images-19.jpg"],
    specifications: [
      { label: "SKU", value: "4.0C-H6A-BO2-IR-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 80,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "4MP H6A Bullet IR Camera with 31x Zoom Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-10",
    sku: "4.0C-H6X-BO1-IR",
    name: "4MP H6X Bullet IR Camera with 4.4-9.3mm Lens",
    slug: "4mp-h6x-bullet-ir-camera-with-4-4-9-3mm-lens-4-0c-h6x-bo1-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 2212.57,
    priceNGN: 2212.57 * 1500,
    description: "4MP H6X Bullet IR Camera with 4.4-9.3mm Lens",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/AVO_Short_Bullet_34_Left_02_NoA-09052023.png"],
    specifications: [
      { label: "SKU", value: "4.0C-H6X-BO1-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 140,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "4MP H6X Bullet IR Camera with 4.4-9.3mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-11",
    sku: "4.0C-H6X-BO2-IR",
    name: "4MP H6X Bullet IR Camera with 31x Zoom",
    slug: "4mp-h6x-bullet-ir-camera-with-31x-zoom-4-0c-h6x-bo2-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 2764.02,
    priceNGN: 2764.02 * 1500,
    description: "4MP H6X Bullet IR Camera with 31x Zoom",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/AVO_Long_Bullet_34_Left_03_022824.png"],
    specifications: [
      { label: "SKU", value: "4.0C-H6X-BO2-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 106,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "4MP H6X Bullet IR Camera with 31x Zoom Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-12",
    sku: "6.0C-H6A-BO1-IR-B",
    name: "6MP H6A Bullet IR Camera with 4.4-9.3mm Lens",
    slug: "6mp-h6a-bullet-ir-camera-with-4-4-9-3mm-lens-6-0c-h6a-bo1-ir-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 2278.8,
    priceNGN: 2278.8 * 1500,
    description: "6MP H6A Bullet IR Camera with 4.4-9.3mm Lens",
    images: ["https://i.ibb.co/ccNjVHVw/images-22.jpg"],
    specifications: [
      { label: "SKU", value: "6.0C-H6A-BO1-IR-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 180,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "6MP H6A Bullet IR Camera with 4.4-9.3mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-13",
    sku: "6.0C-H6A-BO2-IR-B",
    name: "6MP H6A Bullet IR Camera with 31x Zoom",
    slug: "6mp-h6a-bullet-ir-camera-with-31x-zoom-6-0c-h6a-bo2-ir-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 2638.8,
    priceNGN: 2638.8 * 1500,
    description: "6MP H6A Bullet IR Camera with 31x Zoom",
    images: ["https://i.ibb.co/dwTKxWd6/images-19.jpg"],
    specifications: [
      { label: "SKU", value: "6.0C-H6A-BO2-IR-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 81,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "6MP H6A Bullet IR Camera with 31x Zoom Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-14",
    sku: "8.0C-H6A-BO1-IR-B",
    name: "8MP H6A Bullet IR Camera with 4.4-9.3mm Lens",
    slug: "8mp-h6a-bullet-ir-camera-with-4-4-9-3mm-lens-8-0c-h6a-bo1-ir-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 2578.8,
    priceNGN: 2578.8 * 1500,
    description: "8MP H6A Bullet IR Camera with 4.4-9.3mm Lens",
    images: ["https://i.ibb.co/ccNjVHVw/images-22.jpg"],
    specifications: [
      { label: "SKU", value: "8.0C-H6A-BO1-IR-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 148,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "8MP H6A Bullet IR Camera with 4.4-9.3mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-15",
    sku: "8.0C-H6A-BO2-IR",
    name: "8MP H6A Bullet IR Camera with 31x Zoom",
    slug: "8mp-h6a-bullet-ir-camera-with-31x-zoom-8-0c-h6a-bo2-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 2938.8,
    priceNGN: 2938.8 * 1500,
    description: "8MP H6A Bullet IR Camera with 31x Zoom",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/AVO_Long_Bullet_34_Left_03_022824.png"],
    specifications: [
      { label: "SKU", value: "8.0C-H6A-BO2-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 119,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "8MP H6A Bullet IR Camera with 31x Zoom Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-16",
    sku: "8.0C-H6X-BO2-IR",
    name: "8MP H6X Bullet IR Camera with 31x Zoom",
    slug: "8mp-h6x-bullet-ir-camera-with-31x-zoom-8-0c-h6x-bo2-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 3354.41,
    priceNGN: 3354.41 * 1500,
    description: "8MP H6X Bullet IR Camera with 31x Zoom",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/AVO_Long_Bullet_34_Left_03_022824.png"],
    specifications: [
      { label: "SKU", value: "8.0C-H6X-BO2-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 120,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "8MP H6X Bullet IR Camera with 31x Zoom Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-17",
    sku: "2.0C-H6SL-BO1-IR",
    name: "2MP H6SL Bullet Camera with 3.4-10.5mm Lens",
    slug: "2mp-h6sl-bullet-camera-with-3-4-10-5mm-lens-2-0c-h6sl-bo1-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 1090.8,
    priceNGN: 1090.8 * 1500,
    description: "2.0 MP; WDR; LightCatcher; Day/Night; Indoor/Outdoor Bullet Camera; 3.4-10.5mm f/1.6; Integrated IR",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6SL/H6SL_.Compact%20Left%2034%20V3-03092023.png"],
    specifications: [
      { label: "SKU", value: "2.0C-H6SL-BO1-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 105,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "2MP H6SL Bullet Camera with 3.4-10.5mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-18",
    sku: "3.0C-H6SL-BO1-IR",
    name: "3MP H6SL Bullet Camera with 3.4-10.5mm Lens",
    slug: "3mp-h6sl-bullet-camera-with-3-4-10-5mm-lens-3-0c-h6sl-bo1-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 1198.8,
    priceNGN: 1198.8 * 1500,
    description: "3.0 MP; WDR; LightCatcher; Day/Night; Indoor/Outdoor Bullet Camera; 3.4-10.5mm f/1.6; Integrated IR",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6SL/H6SL_.Compact%20Left%2034%20V3-03092023.png"],
    specifications: [
      { label: "SKU", value: "3.0C-H6SL-BO1-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 135,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "3MP H6SL Bullet Camera with 3.4-10.5mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-19",
    sku: "3.0C-H6SL-BO2-IR",
    name: "3MP H6SL Bullet Camera with 10.9-29mm Lens",
    slug: "3mp-h6sl-bullet-camera-with-10-9-29mm-lens-3-0c-h6sl-bo2-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 1319.22,
    priceNGN: 1319.22 * 1500,
    description: "3.0 MP; WDR; LightCatcher; Day/Night; Indoor/Outdoor Bullet Camera;10.9-29mm f/1.7; Integrated IR",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6SL/H6SL_.Compact%20Left%2034%20V3-03092023.png"],
    specifications: [
      { label: "SKU", value: "3.0C-H6SL-BO2-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 104,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "3MP H6SL Bullet Camera with 10.9-29mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-20",
    sku: "5.0C-H6SL-BO1-IR",
    name: "5MP H6SL Bullet Camera with 3.4-10.5mm Lens",
    slug: "5mp-h6sl-bullet-camera-with-3-4-10-5mm-lens-5-0c-h6sl-bo1-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 1378.44,
    priceNGN: 1378.44 * 1500,
    description: "5.0 MP; WDR; LightCatcher; Day/Night; Indoor/Outdoor Bullet Camera; 3.4-10.5mm f/1.6; Integrated IR",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6SL/H6SL_.Compact%20Left%2034%20V3-03092023.png"],
    specifications: [
      { label: "SKU", value: "5.0C-H6SL-BO1-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 162,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "5MP H6SL Bullet Camera with 3.4-10.5mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-21",
    sku: "5.0C-H6SL-BO2-IR",
    name: "5MP H6SL Bullet Camera with 10.9-29mm Lens",
    slug: "5mp-h6sl-bullet-camera-with-10-9-29mm-lens-5-0c-h6sl-bo2-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 1499.4,
    priceNGN: 1499.4 * 1500,
    description: "5.0 MP; WDR; LightCatcher; Day/Night; Indoor/Outdoor Bullet Camera;10.9-29mm f/1.7; Integrated IR",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6SL/H6SL_.Compact%20Left%2034%20V3-03092023.png"],
    specifications: [
      { label: "SKU", value: "5.0C-H6SL-BO2-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 127,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "5MP H6SL Bullet Camera with 10.9-29mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-22",
    sku: "8.0C-H6SL-BO1-IR-B",
    name: "8MP H6SL Bullet Camera with 4.4-9.3mm Lens",
    slug: "8mp-h6sl-bullet-camera-with-4-4-9-3mm-lens-8-0c-h6sl-bo1-ir-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 1678.32,
    priceNGN: 1678.32 * 1500,
    description: "CAM;H6SL;Bul;8.0MP;WDR/LL;4.4-9.3mm;IR",
    images: ["https://i.ibb.co/8DM5v50c/images-18.jpg"],
    specifications: [
      { label: "SKU", value: "8.0C-H6SL-BO1-IR-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 179,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "8MP H6SL Bullet Camera with 4.4-9.3mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-23",
    sku: "320F-H5A-THC-BO12-B",
    name: "QVGA H5A Thermal; Bullet Camera with 18mm Lens; 30Hz",
    slug: "qvga-h5a-thermal-bullet-camera-with-18mm-lens-30hz-320f-h5a-thc-bo12-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 7777.98,
    priceNGN: 7777.98 * 1500,
    description: "320x256; H5A Thermal ;Bullet; 18mm f/1.0; NETD ?50mK; 30Hz; Next-Generation Analytics",
    images: ["https://i.ibb.co/1fNym4gY/images-21.jpg"],
    specifications: [
      { label: "SKU", value: "320F-H5A-THC-BO12-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 162,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "QVGA H5A Thermal; Bullet Camera with 18mm Lens; 30Hz Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-24",
    sku: "320F-H5A-THC-BO16-B",
    name: "QVGA H5A Thermal; Bullet Camera with 14mm Lens; 30Hz",
    slug: "qvga-h5a-thermal-bullet-camera-with-14mm-lens-30hz-320f-h5a-thc-bo16-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 7004.34,
    priceNGN: 7004.34 * 1500,
    description: "320x256; H5A Thermal ;Bullet; 13.8 mm f/1.0; NETD ?50mK; 30Hz; Next-Generation Analytics",
    images: ["https://i.ibb.co/8DM5v50c/images-18.jpg"],
    specifications: [
      { label: "SKU", value: "320F-H5A-THC-BO16-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 167,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "QVGA H5A Thermal; Bullet Camera with 14mm Lens; 30Hz Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-25",
    sku: "320F-H5A-THC-BO24-B",
    name: "QVGA H5A Thermal; Bullet Camera with 9.1mm Lens; 30Hz",
    slug: "qvga-h5a-thermal-bullet-camera-with-9-1mm-lens-30hz-320f-h5a-thc-bo24-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 6453.72,
    priceNGN: 6453.72 * 1500,
    description: "320x256; H5A Thermal ;Bullet; 9.1mm f/1.0; NETD ?50mK; 30Hz; Next-Generation Analytics",
    images: ["https://i.ibb.co/dwTKxWd6/images-19.jpg"],
    specifications: [
      { label: "SKU", value: "320F-H5A-THC-BO24-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 162,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "QVGA H5A Thermal; Bullet Camera with 9.1mm Lens; 30Hz Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-26",
    sku: "320F-H5A-THC-BO50-B",
    name: "QVGA H5A Thermal; Bullet Camera with 4.3mm Lens; 30Hz",
    slug: "qvga-h5a-thermal-bullet-camera-with-4-3mm-lens-30hz-320f-h5a-thc-bo50-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 6122.34,
    priceNGN: 6122.34 * 1500,
    description: "320x256; H5A Thermal ;Bullet; 4.3mm f/1.0; NETD ?50mK; 30Hz; Next-Generation Analytics",
    images: ["https://i.ibb.co/dwTKxWd6/images-19.jpg"],
    specifications: [
      { label: "SKU", value: "320F-H5A-THC-BO50-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 175,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "QVGA H5A Thermal; Bullet Camera with 4.3mm Lens; 30Hz Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-27",
    sku: "640F-H5A-THR-BO50-B",
    name: "640F-H5A-THR-BO50-B",
    slug: "640f-h5a-thr-bo50-b-640f-h5a-thr-bo50-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 9704.52,
    priceNGN: 9704.52 * 1500,
    description: "CAM; H5A; THR; 640; 30Hz; 50FoV",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "640F-H5A-THR-BO50-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 115,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "640F-H5A-THR-BO50-B Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-28",
    sku: "H5AEX-BO-WARR-EXTEND-2YR",
    name: "2 year extended warranty for H5 Explosion Protected Bullet Camera",
    slug: "2-year-extended-warranty-for-h5-explosion-protected-bullet-camera-h5aex-bo-warr-extend-2yr",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 1487.69,
    priceNGN: 1487.69 * 1500,
    description: "2 year extended warranty for H5 Explosion Protected Bullet camera. Must be purchased at the same time as the camera.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Warranty_070720.jpg"],
    specifications: [
      { label: "SKU", value: "H5AEX-BO-WARR-EXTEND-2YR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 162,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "2 year extended warranty for H5 Explosion Protected Bullet Camera Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-29",
    sku: "H5AEX-CO-WARR-EXTEND-2YR",
    name: "2 year extended warranty for H5 Explosion Protected Compact Bullet Camera",
    slug: "2-year-extended-warranty-for-h5-explosion-protected-compact-bullet-camera-h5aex-co-warr-extend-2yr",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 896.46,
    priceNGN: 896.46 * 1500,
    description: "2 year extended warranty for H5 Explosion Protected Compact Bullet camera. Must be purchased at the same time as the camera.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Warranty_070720.jpg"],
    specifications: [
      { label: "SKU", value: "H5AEX-CO-WARR-EXTEND-2YR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 110,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "2 year extended warranty for H5 Explosion Protected Compact Bullet Camera Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-30",
    sku: "3C-H5MOD-MB2",
    name: "3MP Fixed Lens Micro Bullet Imager (H5A Modular)",
    slug: "3mp-fixed-lens-micro-bullet-imager-h5a-modular--3c-h5mod-mb2",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 332.57,
    priceNGN: 332.57 * 1500,
    description: "3MP; H5A Mod; WDR; 2.8mm Fixed Lens; f/2.0; Micro Bullet Imager Module",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H5A%20Modular/Bullet%20Frt%2034%20V2%20AVO-11192021.png"],
    specifications: [
      { label: "SKU", value: "3C-H5MOD-MB2" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "3MP Fixed Lens Micro Bullet Imager (H5A Modular) Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-31",
    sku: "5C-H5MOD-MB2",
    name: "5MP Fixed Lens Micro Bullet Imager (H5A Modular)",
    slug: "5mp-fixed-lens-micro-bullet-imager-h5a-modular--5c-h5mod-mb2",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 466.13,
    priceNGN: 466.13 * 1500,
    description: "5MP; H5A Mod; WDR; 2.8mm Fixed Lens; f/2.0; Micro Bullet Imager Module",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H5A%20Modular/Bullet%20Frt%2034%20V2%20AVO-11192021.png"],
    specifications: [
      { label: "SKU", value: "5C-H5MOD-MB2" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 175,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "5MP Fixed Lens Micro Bullet Imager (H5A Modular) Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-32",
    sku: "BRKTMD-1011",
    name: "Replacement L Bracket for Modular Camera Microbullet Sensor Head",
    slug: "replacement-l-bracket-for-modular-camera-microbullet-sensor-head-brktmd-1011",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 47.66,
    priceNGN: 47.66 * 1500,
    description: "Replacement L Bracket for Modular Camera Microbullet Sensor Head",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "BRKTMD-1011" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 78,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Replacement L Bracket for Modular Camera Microbullet Sensor Head Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-33",
    sku: "BRKTMD-1031",
    name: "Replacement Trimring Bracket for Modular Camera Microbullet Sensor head",
    slug: "replacement-trimring-bracket-for-modular-camera-microbullet-sensor-head-brktmd-1031",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 38.56,
    priceNGN: 38.56 * 1500,
    description: "Replacement Trimring Bracket for Modular Camera Microbullet Sensor head",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "BRKTMD-1031" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 132,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Replacement Trimring Bracket for Modular Camera Microbullet Sensor head Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-34",
    sku: "320F-H5A-THC-BO50",
    name: "QVGA H5A Thermal; Bullet Camera with 4.3mm Lens; 30Hz",
    slug: "qvga-h5a-thermal-bullet-camera-with-4-3mm-lens-30hz-320f-h5a-thc-bo50",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 6122.34,
    priceNGN: 6122.34 * 1500,
    description: "320x256; H5A Thermal ;Bullet; 4.3mm f/1.0; NETD ?50mK; 30Hz; Next-Generation Analytics",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Sarix%20Thermal%20Enhanced%204/thermal_7-110122.png"],
    specifications: [
      { label: "SKU", value: "320F-H5A-THC-BO50" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 180,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "QVGA H5A Thermal; Bullet Camera with 4.3mm Lens; 30Hz Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-35",
    sku: "640F-H5A-THC-BO12",
    name: "VGA H5A Thermal; Bullet Camera with 36mm Lens; 30Hz",
    slug: "vga-h5a-thermal-bullet-camera-with-36mm-lens-30hz-640f-h5a-thc-bo12",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 13817.16,
    priceNGN: 13817.16 * 1500,
    description: "640x512; H5A Thermal ;Bullet; 36mm f/1.0; NETD ?50mK; 30Hz; Next-Generation Analytics",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Sarix%20Thermal%20Enhanced%204/thermal_7-110122.png"],
    specifications: [
      { label: "SKU", value: "640F-H5A-THC-BO12" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 101,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "VGA H5A Thermal; Bullet Camera with 36mm Lens; 30Hz Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-36",
    sku: "640F-H5A-THC-BO18",
    name: "VGA H5A Thermal; Bullet Camera with 24.4mm Lens; 30Hz",
    slug: "vga-h5a-thermal-bullet-camera-with-24-4mm-lens-30hz-640f-h5a-thc-bo18",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 11628.54,
    priceNGN: 11628.54 * 1500,
    description: "640x512; H5A Thermal ;Bullet; 24.3mm f/1.0; NETD ?50mK; 30Hz; Next-Generation Analytics",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Sarix%20Thermal%20Enhanced%204/thermal_7-110122.png"],
    specifications: [
      { label: "SKU", value: "640F-H5A-THC-BO18" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 163,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "VGA H5A Thermal; Bullet Camera with 24.4mm Lens; 30Hz Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-37",
    sku: "640F-H5A-THC-BO24-B",
    name: "VGA H5A Thermal; Bullet Camera with 18mm Lens; 30Hz",
    slug: "vga-h5a-thermal-bullet-camera-with-18mm-lens-30hz-640f-h5a-thc-bo24-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 10093.86,
    priceNGN: 10093.86 * 1500,
    description: "CAM; H5A; THC; 640; 30Hz; 24FoV",
    images: ["https://i.ibb.co/8DM5v50c/images-18.jpg"],
    specifications: [
      { label: "SKU", value: "640F-H5A-THC-BO24-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 90,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "VGA H5A Thermal; Bullet Camera with 18mm Lens; 30Hz Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-38",
    sku: "640F-H5A-THC-BO32-B",
    name: "VGA H5A Thermal; Bullet Camera with 14mm Lens; 30Hz",
    slug: "vga-h5a-thermal-bullet-camera-with-14mm-lens-30hz-640f-h5a-thc-bo32-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 8883,
    priceNGN: 8883 * 1500,
    description: "640x512; H5A Thermal ;Bullet; 14mm f/1.0; NETD ?50mK; 30Hz; Next-Generation Analytics",
    images: ["https://i.ibb.co/1fNym4gY/images-21.jpg"],
    specifications: [
      { label: "SKU", value: "640F-H5A-THC-BO32-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 165,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "VGA H5A Thermal; Bullet Camera with 14mm Lens; 30Hz Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-39",
    sku: "640F-H5A-THC-BO50-B",
    name: "VGA H5A Thermal; Bullet Camera with 9.2mm Lens; 30Hz",
    slug: "vga-h5a-thermal-bullet-camera-with-9-2mm-lens-30hz-640f-h5a-thc-bo50-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 8772.12,
    priceNGN: 8772.12 * 1500,
    description: "640x512; H5A Thermal ;Bullet; 9.2mm f/1.1; NETD ?50mK; 30Hz; Next-Generation Analytics",
    images: ["https://i.ibb.co/8DM5v50c/images-18.jpg"],
    specifications: [
      { label: "SKU", value: "640F-H5A-THC-BO50-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 171,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "VGA H5A Thermal; Bullet Camera with 9.2mm Lens; 30Hz Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-40",
    sku: "640F-H5A-THR-BO32",
    name: "VGA H5A Radiometric; Bullet Camera with 14mm Lens; 30Hz",
    slug: "vga-h5a-radiometric-bullet-camera-with-14mm-lens-30hz-640f-h5a-thr-bo32",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 9887.22,
    priceNGN: 9887.22 * 1500,
    description: "640x512; H5A Radiometric ;Bullet; 14mm f/1.0; NETD ?50mK; 30Hz; Next-Generation Analytics",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Sarix%20Thermal%20Enhanced%204/thermal_7-110122.png"],
    specifications: [
      { label: "SKU", value: "640F-H5A-THR-BO32" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 127,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "VGA H5A Radiometric; Bullet Camera with 14mm Lens; 30Hz Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-41",
    sku: "4.0C-H6XP-BO1-IR-EU-B",
    name: "4.0C-H6XP-BO1-IR-EU",
    slug: "4-0c-h6xp-bo1-ir-eu-4-0c-h6xp-bo1-ir-eu-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 2142,
    priceNGN: 2142 * 1500,
    description: "4MP H6XP Outdoor IR Bullet Camera with 4.4-9.3mm Lens & Z-Wave Hub (868.4 MHz)",
    images: ["https://i.ibb.co/8DM5v50c/images-18.jpg"],
    specifications: [
      { label: "SKU", value: "4.0C-H6XP-BO1-IR-EU-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 95,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "4.0C-H6XP-BO1-IR-EU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-42",
    sku: "4.0C-H6XP-BO1-IR-NA-B",
    name: "4.0C-H6XP-BO1-IR-NA",
    slug: "4-0c-h6xp-bo1-ir-na-4-0c-h6xp-bo1-ir-na-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 2372.58,
    priceNGN: 2372.58 * 1500,
    description: "4MP H6XP Outdoor IR Bullet Camera with 4.4-9.3mm Lens & Z-Wave Hub (908.4 MHz)",
    images: ["https://i.ibb.co/1fNym4gY/images-21.jpg"],
    specifications: [
      { label: "SKU", value: "4.0C-H6XP-BO1-IR-NA-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 216,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "4.0C-H6XP-BO1-IR-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-43",
    sku: "8.0C-H6X-BO1-IR-B",
    name: "8MP H6X Bullet IR Camera with 4.4-9.3mm Lens",
    slug: "8mp-h6x-bullet-ir-camera-with-4-4-9-3mm-lens-8-0c-h6x-bo1-ir-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 2913.59,
    priceNGN: 2913.59 * 1500,
    description: "8MP H6X Bullet IR Camera with 4.4-9.3mm Lens",
    images: ["https://i.ibb.co/8DM5v50c/images-18.jpg"],
    specifications: [
      { label: "SKU", value: "8.0C-H6X-BO1-IR-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 168,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "8MP H6X Bullet IR Camera with 4.4-9.3mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bullet-44",
    sku: "8.0C-H6XP-BO1-IR-NA-B",
    name: "8.0C-H6XP-BO1-IR-NA",
    slug: "8-0c-h6xp-bo1-ir-na-8-0c-h6xp-bo1-ir-na-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Bullet Camera",
    priceUSD: 2930.76,
    priceNGN: 2930.76 * 1500,
    description: "8MP H6XP Outdoor IR Bullet Camera with 4.4-9.3mm Lens & Z-Wave Hub (908.4 MHz)",
    images: ["https://i.ibb.co/dwTKxWd6/images-19.jpg"],
    specifications: [
      { label: "SKU", value: "8.0C-H6XP-BO1-IR-NA-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Bullet Camera" },
    ],
    stock: 147,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "8.0C-H6XP-BO1-IR-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  }
];



export const PANORAMIC_CAMERA_PRODUCTS: Product[] = [
  {
    id: "sp-panoramic-1",
    sku: "12.0C-H6A-FE-360-DO1",
    name: "12.0C-H6A-FE-360-DO1",
    slug: "12-0c-h6a-fe-360-do1-12-0c-h6a-fe-360-do1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Panoramic Camera",
    priceUSD: 1858.5,
    priceNGN: 1858.5 * 1500,
    description: "CAM; H6F; Outdoor; 12MP; 360; WDR/LL",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H5A%20Multisensor/H5A-Multisensor-Pendant-NONPT.png"],
    specifications: [
      { label: "SKU", value: "12.0C-H6A-FE-360-DO1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Panoramic Camera" },
    ],
    stock: 152,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "12.0C-H6A-FE-360-DO1 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-panoramic-2",
    sku: "12.0C-H6A-FE-360-DO1-IR",
    name: "12.0C-H6A-FE-360-DO1-IR",
    slug: "12-0c-h6a-fe-360-do1-ir-12-0c-h6a-fe-360-do1-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Panoramic Camera",
    priceUSD: 1978.2,
    priceNGN: 1978.2 * 1500,
    description: "CAM; H6F; Outdoor; 12MP; 360; WDR/LL; IR",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H5A%20Multisensor/H5A-Multisensor-Pendant-NONPT.png"],
    specifications: [
      { label: "SKU", value: "12.0C-H6A-FE-360-DO1-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Panoramic Camera" },
    ],
    stock: 83,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "12.0C-H6A-FE-360-DO1-IR Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-panoramic-3",
    sku: "12.0C-H6A-FE-DC1",
    name: "12.0C-H6A-FE-DC1",
    slug: "12-0c-h6a-fe-dc1-12-0c-h6a-fe-dc1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Panoramic Camera",
    priceUSD: 1858.5,
    priceNGN: 1858.5 * 1500,
    description: "CAM; H6F; In-Ceiling; 12MP; 360; WDR/LL",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H5A%20Multisensor/H5A-Multisensor-Pendant-NONPT.png"],
    specifications: [
      { label: "SKU", value: "12.0C-H6A-FE-DC1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Panoramic Camera" },
    ],
    stock: 174,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "12.0C-H6A-FE-DC1 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-panoramic-4",
    sku: "8.0C-H6A-FE-180-DO2",
    name: "8.0C-H6A-FE-180-DO2",
    slug: "8-0c-h6a-fe-180-do2-8-0c-h6a-fe-180-do2",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Panoramic Camera",
    priceUSD: 1198.8,
    priceNGN: 1198.8 * 1500,
    description: "CAM; H6F; Outdoor; 8MP; 180; WDR/LL",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H5A%20Multisensor/H5A-Multisensor-Pendant-NONPT.png"],
    specifications: [
      { label: "SKU", value: "8.0C-H6A-FE-180-DO2" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Panoramic Camera" },
    ],
    stock: 74,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "8.0C-H6A-FE-180-DO2 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-panoramic-5",
    sku: "8.0C-H6A-FE-180-DO2-IR",
    name: "8.0C-H6A-FE-180-DO2-IR",
    slug: "8-0c-h6a-fe-180-do2-ir-8-0c-h6a-fe-180-do2-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Panoramic Camera",
    priceUSD: 1258.8,
    priceNGN: 1258.8 * 1500,
    description: "CAM; H6F; Outdoor; 8MP; 180; WDR/LL; IR",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H5A%20Multisensor/H5A-Multisensor-Pendant-NONPT.png"],
    specifications: [
      { label: "SKU", value: "8.0C-H6A-FE-180-DO2-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Panoramic Camera" },
    ],
    stock: 124,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "8.0C-H6A-FE-180-DO2-IR Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-panoramic-6",
    sku: "8.0C-H6A-FE-360-DO1",
    name: "8.0C-H6A-FE-360-DO1",
    slug: "8-0c-h6a-fe-360-do1-8-0c-h6a-fe-360-do1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Panoramic Camera",
    priceUSD: 1138.8,
    priceNGN: 1138.8 * 1500,
    description: "CAM; H6F; Outdoor; 8MP; 360; WDR/LL",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H5A%20Multisensor/H5A-Multisensor-Pendant-NONPT.png"],
    specifications: [
      { label: "SKU", value: "8.0C-H6A-FE-360-DO1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Panoramic Camera" },
    ],
    stock: 172,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "8.0C-H6A-FE-360-DO1 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-panoramic-7",
    sku: "8.0C-H6A-FE-360-DO1-IR",
    name: "8.0C-H6A-FE-360-DO1-IR",
    slug: "8-0c-h6a-fe-360-do1-ir-8-0c-h6a-fe-360-do1-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Panoramic Camera",
    priceUSD: 1198.8,
    priceNGN: 1198.8 * 1500,
    description: "CAM; H6F; Outdoor; 8MP; 360; WDR/LL; IR",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H5A%20Multisensor/H5A-Multisensor-Pendant-NONPT.png"],
    specifications: [
      { label: "SKU", value: "8.0C-H6A-FE-360-DO1-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Panoramic Camera" },
    ],
    stock: 115,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "8.0C-H6A-FE-360-DO1-IR Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-panoramic-8",
    sku: "8.0C-H6A-FE-DC1",
    name: "8.0C-H6A-FE-DC1",
    slug: "8-0c-h6a-fe-dc1-8-0c-h6a-fe-dc1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Panoramic Camera",
    priceUSD: 1198.8,
    priceNGN: 1198.8 * 1500,
    description: "CAM; H6F; In-Ceiling; 8MP; 360; WDR/LL",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "8.0C-H6A-FE-DC1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Panoramic Camera" },
    ],
    stock: 110,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "8.0C-H6A-FE-DC1 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-panoramic-9",
    sku: "12C-H5A-4MH-DP1",
    name: "4x3MP H5A Multisensor with H5AMH-AD-PEND1 pendant adaptor and H5AMH-DO-COVR1",
    slug: "4x3mp-h5a-multisensor-with-h5amh-ad-pend1-pendant-adaptor-and-h5amh-do-covr1-12c-h5a-4mh-dp1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Panoramic Camera",
    priceUSD: 3621.24,
    priceNGN: 3621.24 * 1500,
    description: "4X3MP; WDR; 360 degree max field of view; Lightcatcher; 3.3-5.7MM; with pendant adapter and clear dome cover",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H5A%20Multisensor/H5A-Multisensor-Pendant-NONPT.png"],
    specifications: [
      { label: "SKU", value: "12C-H5A-4MH-DP1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Panoramic Camera" },
    ],
    stock: 139,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "4x3MP H5A Multisensor with H5AMH-AD-PEND1 pendant adaptor and H5AMH-DO-COVR1 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-panoramic-10",
    sku: "15C-H5A-3MH-B",
    name: "15C-H5A-3MH-B",
    slug: "15c-h5a-3mh-b-15c-h5a-3mh-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Panoramic Camera",
    priceUSD: 3058.8,
    priceNGN: 3058.8 * 1500,
    description: "H5AMH 3X5MP 3.3-5.7MM ANLYTCS CAM MODULE",
    images: ["https://i.ibb.co/Ndf7mLkr/images-24.jpg"],
    specifications: [
      { label: "SKU", value: "15C-H5A-3MH-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Panoramic Camera" },
    ],
    stock: 162,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "15C-H5A-3MH-B Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-panoramic-11",
    sku: "15C-H5A-3MH-DP1",
    name: "3x5MP H5A Multisensor with H5AMH-AD-PEND1 pendant adaptor and H5AMH-DO-COVR1",
    slug: "3x5mp-h5a-multisensor-with-h5amh-ad-pend1-pendant-adaptor-and-h5amh-do-covr1-15c-h5a-3mh-dp1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Panoramic Camera",
    priceUSD: 3560.76,
    priceNGN: 3560.76 * 1500,
    description: "3X5MP; WDR; 270 degree max field of view; Lightcatcher; 3.3-5.7MM; with pendant adapter and clear dome cover",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H5A%20Multisensor/H5A-Multisensor-Pendant-NONPT.png"],
    specifications: [
      { label: "SKU", value: "15C-H5A-3MH-DP1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Panoramic Camera" },
    ],
    stock: 128,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "3x5MP H5A Multisensor with H5AMH-AD-PEND1 pendant adaptor and H5AMH-DO-COVR1 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-panoramic-12",
    sku: "20C-H5A-4MH",
    name: "H5A Multisensor 20MP Camera Module 3.3-5.7mm",
    slug: "h5a-multisensor-20mp-camera-module-3-3-5-7mm-20c-h5a-4mh",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Panoramic Camera",
    priceUSD: 3598.8,
    priceNGN: 3598.8 * 1500,
    description: "4X5MP; WDR; 360 degree max field of view; Lightcatcher; 3.3-5.7MM; Camera Only",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H5A%20Multisensor/H4%20Mounts/H4_Surface_Mount%204%20Head%20AVO%201%20of%2010_Final-05032023.png"],
    specifications: [
      { label: "SKU", value: "20C-H5A-4MH" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Panoramic Camera" },
    ],
    stock: 73,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: true,
    popular: false,
    downloads: [
      { title: "H5A Multisensor 20MP Camera Module 3.3-5.7mm Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-panoramic-13",
    sku: "20C-H5A-4MH-DP1",
    name: "4x5MP H5A Multisensor with H5AMH-AD-PEND1 pendant adaptor and H5AMH-DO-COVR1",
    slug: "4x5mp-h5a-multisensor-with-h5amh-ad-pend1-pendant-adaptor-and-h5amh-do-covr1-20c-h5a-4mh-dp1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Panoramic Camera",
    priceUSD: 4101.3,
    priceNGN: 4101.3 * 1500,
    description: "4X5MP; WDR; 360 degree max field of view; Lightcatcher; 3.3-5.7MM; with pendant adapter and clear dome cover",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H5A%20Multisensor/H5A-Multisensor-Pendant-NONPT.png"],
    specifications: [
      { label: "SKU", value: "20C-H5A-4MH-DP1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Panoramic Camera" },
    ],
    stock: 106,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: true,
    popular: false,
    downloads: [
      { title: "4x5MP H5A Multisensor with H5AMH-AD-PEND1 pendant adaptor and H5AMH-DO-COVR1 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-panoramic-14",
    sku: "24C-H5A-3MH-DP1",
    name: "3x8MP H5A Multisensor with H5AMH-AD-PEND1 pendant adaptor and H5AMH-DO-COVR1",
    slug: "3x8mp-h5a-multisensor-with-h5amh-ad-pend1-pendant-adaptor-and-h5amh-do-covr1-24c-h5a-3mh-dp1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Panoramic Camera",
    priceUSD: 3980.34,
    priceNGN: 3980.34 * 1500,
    description: "3X8MP; WDR; 270 degree max field of view; Lightcatcher; 3.3-5.7MM; with pendant adapter and clear dome cover",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H5A%20Multisensor/H5A-Multisensor-Pendant-NONPT.png"],
    specifications: [
      { label: "SKU", value: "24C-H5A-3MH-DP1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Panoramic Camera" },
    ],
    stock: 116,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "3x8MP H5A Multisensor with H5AMH-AD-PEND1 pendant adaptor and H5AMH-DO-COVR1 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-panoramic-15",
    sku: "32C-H5A-4MH-DP1-B",
    name: "4x8MP H5A Multisensor with H5AMH-AD-PEND1 pendant adaptor and H5AMH-DO-COVR1",
    slug: "4x8mp-h5a-multisensor-with-h5amh-ad-pend1-pendant-adaptor-and-h5amh-do-covr1-32c-h5a-4mh-dp1-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Panoramic Camera",
    priceUSD: 4618.8,
    priceNGN: 4618.8 * 1500,
    description: "4X8MP; WDR; 360 degree max field of view; Lightcatcher; 3.3-5.7MM; with pendant adapter and clear dome cover",
    images: ["https://i.ibb.co/sd01NYGn/images-23.jpg"],
    specifications: [
      { label: "SKU", value: "32C-H5A-4MH-DP1-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Panoramic Camera" },
    ],
    stock: 152,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: true,
    downloads: [
      { title: "4x8MP H5A Multisensor with H5AMH-AD-PEND1 pendant adaptor and H5AMH-DO-COVR1 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-panoramic-16",
    sku: "12C-H5A-4MH-B",
    name: "12C-H5A-4MH-B",
    slug: "12c-h5a-4mh-b-12c-h5a-4mh-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Panoramic Camera",
    priceUSD: 3118.8,
    priceNGN: 3118.8 * 1500,
    description: "H5AMH 4X3MP 3.3-5.7MM ANLYTCS CAM MODULE",
    images: ["https://i.ibb.co/sd01NYGn/images-23.jpg"],
    specifications: [
      { label: "SKU", value: "12C-H5A-4MH-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Panoramic Camera" },
    ],
    stock: 94,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: true,
    downloads: [
      { title: "12C-H5A-4MH-B Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-panoramic-17",
    sku: "20C-H5A-4MH-B",
    name: "20C-H5A-4MH-B",
    slug: "20c-h5a-4mh-b-20c-h5a-4mh-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Panoramic Camera",
    priceUSD: 3598.8,
    priceNGN: 3598.8 * 1500,
    description: "H5AMH 4X5MP 3.3-5.7MM ANLYTCS CAM MODULE",
    images: ["https://i.ibb.co/F4ScV2mc/images-25.jpg"],
    specifications: [
      { label: "SKU", value: "20C-H5A-4MH-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Panoramic Camera" },
    ],
    stock: 121,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "20C-H5A-4MH-B Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-panoramic-18",
    sku: "24C-H5A-3MH-B",
    name: "24C-H5A-3MH-B",
    slug: "24c-h5a-3mh-b-24c-h5a-3mh-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Panoramic Camera",
    priceUSD: 3652.74,
    priceNGN: 3652.74 * 1500,
    description: "H5AMH 3X8MP 3.3-5.7MM ANLYTCS CAM MODULE",
    images: ["https://i.ibb.co/sd01NYGn/images-23.jpg"],
    specifications: [
      { label: "SKU", value: "24C-H5A-3MH-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Panoramic Camera" },
    ],
    stock: 104,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "24C-H5A-3MH-B Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-panoramic-19",
    sku: "32C-H5A-4MH-B",
    name: "H5A Multisensor 32MP Camera Module 3.3-5.7mm",
    slug: "h5a-multisensor-32mp-camera-module-3-3-5-7mm-32c-h5a-4mh-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Panoramic Camera",
    priceUSD: 4138.8,
    priceNGN: 4138.8 * 1500,
    description: "H5AMH 4X8MP 3.3-5.7MM ANLYTCS CAM MODULE",
    images: ["https://i.ibb.co/sd01NYGn/images-23.jpg"],
    specifications: [
      { label: "SKU", value: "32C-H5A-4MH-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Panoramic Camera" },
    ],
    stock: 136,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "H5A Multisensor 32MP Camera Module 3.3-5.7mm Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-panoramic-20",
    sku: "9C-H5A-3MH-B",
    name: "9C-H5A-3MH-B",
    slug: "9c-h5a-3mh-b-9c-h5a-3mh-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Panoramic Camera",
    priceUSD: 2698.8,
    priceNGN: 2698.8 * 1500,
    description: "H5AMH 3X3MP 3.3-5.7MM ANLYTCS CAM MODULE",
    images: ["https://i.ibb.co/Ndf7mLkr/images-24.jpg"],
    specifications: [
      { label: "SKU", value: "9C-H5A-3MH-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Panoramic Camera" },
    ],
    stock: 169,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "9C-H5A-3MH-B Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-panoramic-21",
    sku: "180-FE-WG-MT",
    name: "180-FE-WG-MT",
    slug: "180-fe-wg-mt-180-fe-wg-mt",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Panoramic Camera",
    priceUSD: 126,
    priceNGN: 126 * 1500,
    description: "Wedge wall mount for 180 Fisheye",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "180-FE-WG-MT" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Panoramic Camera" },
    ],
    stock: 94,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "180-FE-WG-MT Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-panoramic-22",
    sku: "CBLKT-1001",
    name: "Cable kit replacement for for Multi sensor Multi directional cameras",
    slug: "cable-kit-replacement-for-for-multi-sensor-multi-directional-cameras-cblkt-1001",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Panoramic Camera",
    priceUSD: 96.77,
    priceNGN: 96.77 * 1500,
    description: "Cable kit replacement for for Multi sensor Multi directional cameras",
    images: ["https://i.ibb.co/F4ScV2mc/images-25.jpg"],
    specifications: [
      { label: "SKU", value: "CBLKT-1001" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Panoramic Camera" },
    ],
    stock: 149,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Cable kit replacement for for Multi sensor Multi directional cameras Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-panoramic-23",
    sku: "CLPNL-1001",
    name: "Ceiling panel metal white 2 ft X 2 ft for Multi Sensor Multi directional camera",
    slug: "ceiling-panel-metal-white-2-ft-x-2-ft-for-multi-sensor-multi-directional-camera-clpnl-1001",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Panoramic Camera",
    priceUSD: 132.23,
    priceNGN: 132.23 * 1500,
    description: "Ceiling panel metal white 2 ft X 2 ft to replace exisiting ceiling tile for Multi Sensor Multi directional camera",
    images: ["https://i.ibb.co/4ZcT3G3p/images-26.jpg"],
    specifications: [
      { label: "SKU", value: "CLPNL-1001" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Panoramic Camera" },
    ],
    stock: 103,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Ceiling panel metal white 2 ft X 2 ft for Multi Sensor Multi directional camera Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-panoramic-24",
    sku: "DMSLD-1201",
    name: "Weathershield; Dual Head Cameras",
    slug: "weathershield-dual-head-cameras-dmsld-1201",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Panoramic Camera",
    priceUSD: 56.7,
    priceNGN: 56.7 * 1500,
    description: "Weathershield; Dual Head Cameras",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "DMSLD-1201" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Panoramic Camera" },
    ],
    stock: 132,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Weathershield; Dual Head Cameras Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-panoramic-25",
    sku: "H4AMH-AD-IRIL1",
    name: "IR Illuminator Ring for H4/H5 Multisensor",
    slug: "ir-illuminator-ring-for-h4-h5-multisensor-h4amh-ad-iril1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Panoramic Camera",
    priceUSD: 490.64,
    priceNGN: 490.64 * 1500,
    description: "Optional IR illuminator ring; up to 30m (100ft); for use with H4AMH-DO-COVR1.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/Avigilon_H4-Multisensor-Camera_IR-Ring_Angle_070120.jpg"],
    specifications: [
      { label: "SKU", value: "H4AMH-AD-IRIL1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Panoramic Camera" },
    ],
    stock: 169,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "IR Illuminator Ring for H4/H5 Multisensor Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-panoramic-26",
    sku: "H4AMH-WARR-EXTEND-1YR",
    name: "H4 Multisensor 1 Year Extended Warranty",
    slug: "h4-multisensor-1-year-extended-warranty-h4amh-warr-extend-1yr",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Panoramic Camera",
    priceUSD: 276.96,
    priceNGN: 276.96 * 1500,
    description: "Extended Warranty for H4 Multisensor camera; 1 year extension",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Warranty_070720.jpg"],
    specifications: [
      { label: "SKU", value: "H4AMH-WARR-EXTEND-1YR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Panoramic Camera" },
    ],
    stock: 125,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "H4 Multisensor 1 Year Extended Warranty Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-panoramic-27",
    sku: "H4AMH-WARR-EXTEND-2YR",
    name: "H4 Multisensor 2 Years Extended Warranty",
    slug: "h4-multisensor-2-years-extended-warranty-h4amh-warr-extend-2yr",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Panoramic Camera",
    priceUSD: 553.91,
    priceNGN: 553.91 * 1500,
    description: "Extended Warranty for H4 Multisensor camera; 2 years extensions",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H5A%20Multisensor/H5A-Multisensor-Pendant-NONPT.png"],
    specifications: [
      { label: "SKU", value: "H4AMH-WARR-EXTEND-2YR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Panoramic Camera" },
    ],
    stock: 146,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "H4 Multisensor 2 Years Extended Warranty Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-panoramic-28",
    sku: "H4F-WARR-EXTEND-1YR",
    name: "H4 Fisheye Camera 1 Year Extended Warranty",
    slug: "h4-fisheye-camera-1-year-extended-warranty-h4f-warr-extend-1yr",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Panoramic Camera",
    priceUSD: 128.27,
    priceNGN: 128.27 * 1500,
    description: "Extended Warranty for H4 Fisheye cameras; 1 year extension",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H5A%20Multisensor/H5A-Multisensor-Pendant-NONPT.png"],
    specifications: [
      { label: "SKU", value: "H4F-WARR-EXTEND-1YR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Panoramic Camera" },
    ],
    stock: 167,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "H4 Fisheye Camera 1 Year Extended Warranty Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-panoramic-29",
    sku: "H4F-WARR-EXTEND-2YR",
    name: "H4 Fisheye Camera 2 Years Extended Warranty",
    slug: "h4-fisheye-camera-2-years-extended-warranty-h4f-warr-extend-2yr",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Panoramic Camera",
    priceUSD: 256.56,
    priceNGN: 256.56 * 1500,
    description: "Extended Warranty for H4 Fisheye cameras; 2 years extension",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H5A%20Multisensor/H5A-Multisensor-Pendant-NONPT.png"],
    specifications: [
      { label: "SKU", value: "H4F-WARR-EXTEND-2YR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Panoramic Camera" },
    ],
    stock: 159,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "H4 Fisheye Camera 2 Years Extended Warranty Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-panoramic-30",
    sku: "H4VI-MT-SURF1",
    name: "Surface mount adapter for H4 Video Intercom",
    slug: "surface-mount-adapter-for-h4-video-intercom-h4vi-mt-surf1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Panoramic Camera",
    priceUSD: 334.55,
    priceNGN: 334.55 * 1500,
    description: "Surface mount adapter for H4 Video Intercom",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/Avigilon_H4-Video-Intercom_Surface-Mount-Accessory_070120.jpg"],
    specifications: [
      { label: "SKU", value: "H4VI-MT-SURF1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Panoramic Camera" },
    ],
    stock: 175,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Surface mount adapter for H4 Video Intercom Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-panoramic-31",
    sku: "H5A-FE-DC-CPNL1",
    name: "Metal Ceiling Panel for H5A Fisheye In-Ceiling Camera",
    slug: "metal-ceiling-panel-for-h5a-fisheye-in-ceiling-camera-h5a-fe-dc-cpnl1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Panoramic Camera",
    priceUSD: 141.4,
    priceNGN: 141.4 * 1500,
    description: "Metal ceiling panel for use with H5A Fisheye in-ceiling cameras to replace or reinforce the existing ceiling tile in suspended ceiling installations.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Video-Infrastructure-Devices-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "H5A-FE-DC-CPNL1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Panoramic Camera" },
    ],
    stock: 154,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Metal Ceiling Panel for H5A Fisheye In-Ceiling Camera Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-panoramic-32",
    sku: "H5AMH-AD-CEIL1",
    name: "In-Ceiling Adapter for H5A Multisensor",
    slug: "in-ceiling-adapter-for-h5a-multisensor-h5amh-ad-ceil1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Panoramic Camera",
    priceUSD: 223.02,
    priceNGN: 223.02 * 1500,
    description: "In-ceiling adapter; must order either a H5AMH-DC-COVR1 or H5AMH-DC-COVR1-SMOKE.",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H5A%20Multisensor/H5A-Multisensor-Pendant-NONPT.png"],
    specifications: [
      { label: "SKU", value: "H5AMH-AD-CEIL1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Panoramic Camera" },
    ],
    stock: 74,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "In-Ceiling Adapter for H5A Multisensor Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-panoramic-33",
    sku: "H5AMH-AD-DOME1",
    name: "Outdoor surface mount adapter",
    slug: "outdoor-surface-mount-adapter-h5amh-ad-dome1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Panoramic Camera",
    priceUSD: 251.09,
    priceNGN: 251.09 * 1500,
    description: "Outdoor surface mount adapter. For use with the Avigilon H5A Multisensor",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "H5AMH-AD-DOME1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Panoramic Camera" },
    ],
    stock: 153,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Outdoor surface mount adapter Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-panoramic-34",
    sku: "H5AMH-AD-PEND1",
    name: "H5AMH-AD-PEND1",
    slug: "h5amh-ad-pend1-h5amh-ad-pend1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Panoramic Camera",
    priceUSD: 251.09,
    priceNGN: 251.09 * 1500,
    description: "Outdoor pendant mount adapter. For use with the Avigilon H5A Multisensor",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "H5AMH-AD-PEND1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Panoramic Camera" },
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "H5AMH-AD-PEND1 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-panoramic-35",
    sku: "H5DH-MT-NPTA1",
    name: "Pendant Adapter for H5A Dual Head Camera",
    slug: "pendant-adapter-for-h5a-dual-head-camera-h5dh-mt-npta1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Panoramic Camera",
    priceUSD: 89.21,
    priceNGN: 89.21 * 1500,
    description: "Pendant adapter for the H5A Dual Head camera.  Also compatible with an optional wall arm; WLMT-1021.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/H5%20Dual%20Head/H5-Dual-Head-Pole-Adapter-03232021.jpg"],
    specifications: [
      { label: "SKU", value: "H5DH-MT-NPTA1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Panoramic Camera" },
    ],
    stock: 110,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Pendant Adapter for H5A Dual Head Camera Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-panoramic-36",
    sku: "MSI-FE-CPNL",
    name: "MSI-FE-CPNL",
    slug: "msi-fe-cpnl-msi-fe-cpnl",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Panoramic Camera",
    priceUSD: 176.4,
    priceNGN: 176.4 * 1500,
    description: "Ceiling Panel for Fisheye In-Ceiling",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "MSI-FE-CPNL" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Panoramic Camera" },
    ],
    stock: 123,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "MSI-FE-CPNL Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-panoramic-37",
    sku: "MSI-FE-DC-KIT",
    name: "MSI-FE-DC-KIT",
    slug: "msi-fe-dc-kit-msi-fe-dc-kit",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Panoramic Camera",
    priceUSD: 18.9,
    priceNGN: 18.9 * 1500,
    description: "Install Accy Kit for Fisheye In-Ceiling",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "MSI-FE-DC-KIT" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Panoramic Camera" },
    ],
    stock: 173,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "MSI-FE-DC-KIT Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-panoramic-38",
    sku: "10.0C-H6ADH-DO1-IR",
    name: "2x 5MP H6A Dual Head Camera. Outdoor camera with built-in IR",
    slug: "2x-5mp-h6a-dual-head-camera-outdoor-camera-with-built-in-ir-10-0c-h6adh-do1-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Panoramic Camera",
    priceUSD: 2518.74,
    priceNGN: 2518.74 * 1500,
    description: "2x 5MP H6A Dual Head Camera. Outdoor camera with built-in IR",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "10.0C-H6ADH-DO1-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Panoramic Camera" },
    ],
    stock: 78,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "2x 5MP H6A Dual Head Camera. Outdoor camera with built-in IR Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-panoramic-39",
    sku: "16.0C-H6ADH-DO1-IR",
    name: "2x 8MP H6A Dual Head Outdoor Camera",
    slug: "2x-8mp-h6a-dual-head-outdoor-camera-16-0c-h6adh-do1-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Panoramic Camera",
    priceUSD: 3118.5,
    priceNGN: 3118.5 * 1500,
    description: "2x 8MP H6A Dual Head Camera. Outdoor camera with built-in IR",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "16.0C-H6ADH-DO1-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Panoramic Camera" },
    ],
    stock: 96,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "2x 8MP H6A Dual Head Outdoor Camera Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-panoramic-40",
    sku: "6.0C-H6ADH-DO1-IR",
    name: "2x 3MP H6A Dual Head Outdoor Camera",
    slug: "2x-3mp-h6a-dual-head-outdoor-camera-6-0c-h6adh-do1-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Panoramic Camera",
    priceUSD: 2158.38,
    priceNGN: 2158.38 * 1500,
    description: "2x 3MP H6A Dual Head Camera. Outdoor camera with built-in IR",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "6.0C-H6ADH-DO1-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Panoramic Camera" },
    ],
    stock: 100,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "2x 3MP H6A Dual Head Outdoor Camera Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  }
];



export const DOME_CAMERA_PRODUCTS: Product[] = [
  {
    id: "sp-dome-1",
    sku: "ACMICR-1001",
    name: "Internal microphone accessory for Dome Cameras",
    slug: "internal-microphone-accessory-for-dome-cameras-acmicr-1001",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 12.6,
    priceNGN: 12.6 * 1500,
    description: "Internal microphone accessory for Dome Cameras",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6%20Mini%20Dome/H6%20Mini%20InCeiling%20Bucket%20White-02072022.png"],
    specifications: [
      { label: "SKU", value: "ACMICR-1001" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 100,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Internal microphone accessory for Dome Cameras Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-2",
    sku: "CLADP-1001",
    name: "Adapter; In-ceiling; 7.5\" Dia; Grey",
    slug: "adapter-in-ceiling-75-dia-grey-cladp-1001",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 107.1,
    priceNGN: 107.1 * 1500,
    description: "Adapter; In-ceiling; 7.5\" Dia; Grey",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/CLADP-1001-09192023.png"],
    specifications: [
      { label: "SKU", value: "CLADP-1001" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 147,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Adapter; In-ceiling; 7.5\" Dia; Grey Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-3",
    sku: "CLPNL-1011",
    name: "Ceiling Panel; 2ft x 2ft; 7.5\" Dia; Grey",
    slug: "ceiling-panel-2ft-x-2ft-75-dia-grey-clpnl-1011",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 170.1,
    priceNGN: 170.1 * 1500,
    description: "Ceiling Panel; 2ft x 2ft; 7.5\" Dia; Grey",
    images: ["https://i.ibb.co/nM0SFS5g/images-21.jpg"],
    specifications: [
      { label: "SKU", value: "CLPNL-1011" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 162,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Ceiling Panel; 2ft x 2ft; 7.5\" Dia; Grey Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-4",
    sku: "CNCVR-1001",
    name: "Adapter 3/4 inch conduit for 6.1\" (156mm) dome camera 5-pack",
    slug: "adapter-34-inch-conduit-for-61-156mm-dome-camera-5-pack-cncvr-1001",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 44.1,
    priceNGN: 44.1 * 1500,
    description: "Adapter 3/4 inch conduit for 6.1\" (156mm) dome camera 5-pack",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/CLADP-1001-09192023.png"],
    specifications: [
      { label: "SKU", value: "CNCVR-1001" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 169,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Adapter 3/4 inch conduit for 6.1\" (156mm) dome camera 5-pack Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-5",
    sku: "DMBBL-1001",
    name: "Dome bubble replacement; 4.7\" Dia",
    slug: "dome-bubble-replacement-47-dia-dmbbl-1001",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 65.52,
    priceNGN: 65.52 * 1500,
    description: "Dome bubble replacement; 4.7\" Dia",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/H6A-Non-IR-Dome-Bubble.png"],
    specifications: [
      { label: "SKU", value: "DMBBL-1001" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 124,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Dome bubble replacement; 4.7\" Dia Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-6",
    sku: "DMBBL-1011",
    name: "IR Dome bubble replacement; 4.7\" Dia",
    slug: "ir-dome-bubble-replacement-47-dia-dmbbl-1011",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 94.5,
    priceNGN: 94.5 * 1500,
    description: "IR Dome bubble replacement; 4.7\" Dia",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/H6A-IR-Dome-Bubble.png"],
    specifications: [
      { label: "SKU", value: "DMBBL-1011" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 124,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "IR Dome bubble replacement; 4.7\" Dia Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-7",
    sku: "DMSBL-1001",
    name: "Smoked dome bubble; 4.7\" Dia",
    slug: "smoked-dome-bubble-47-dia-dmsbl-1001",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 65.52,
    priceNGN: 65.52 * 1500,
    description: "Smoked dome bubble; 4.7\" Dia",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/H6A-Non-IR-Dome-Bubble.png"],
    specifications: [
      { label: "SKU", value: "DMSBL-1001" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 175,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Smoked dome bubble; 4.7\" Dia Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-8",
    sku: "DMSLD-1001",
    name: "Weathershield; Large Outdoor Domes",
    slug: "weathershield-large-outdoor-domes-dmsld-1001",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 37.8,
    priceNGN: 37.8 * 1500,
    description: "Weathershield; Large Outdoor Domes",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/DMSLD-1001-09192023.png"],
    specifications: [
      { label: "SKU", value: "DMSLD-1001" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 164,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Weathershield; Large Outdoor Domes Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-9",
    sku: "H3-D-SMOKE",
    name: "Replacement Smoke Dome Cover for Indoor H3 or H3A Dome Cameras",
    slug: "replacement-smoke-dome-cover-for-indoor-h3-or-h3a-dome-cameras-h3-d-smoke",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 59.47,
    priceNGN: 59.47 * 1500,
    description: "Replacement smoked transparent cover; includes dome bubble and camera cover for indoor domes. Reduces light transmission by 50% compared to the standard clear cover. Not recommended for low light applications or with the integrated IR illuminator.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/H6A-Non-IR-Dome-Bubble.png"],
    specifications: [
      { label: "SKU", value: "H3-D-SMOKE" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 183,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Replacement Smoke Dome Cover for Indoor H3 or H3A Dome Cameras Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-10",
    sku: "H3-DC-PNL",
    name: "Metal In-Ceiling Metal Panel for H3 or H3A In-Ceiling Dome Cameras",
    slug: "metal-in-ceiling-metal-panel-for-h3-or-h3a-in-ceiling-dome-cameras-h3-dc-pnl",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 141.26,
    priceNGN: 141.26 * 1500,
    description: "Metal ceiling panel for use with H3-DC in-ceiling dome cameras to replace or reinforce the existing ceiling tile in suspended ceiling installations.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/H6A_Dome_34Left_NonMic_IR_01-09052023.png"],
    specifications: [
      { label: "SKU", value: "H3-DC-PNL" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 82,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Metal In-Ceiling Metal Panel for H3 or H3A In-Ceiling Dome Cameras Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-11",
    sku: "H3-MC-CLER1",
    name: "Replacement Clear Dome Cover for H3 In-Ceiling Microdome; Grey Trim",
    slug: "replacement-clear-dome-cover-for-h3-in-ceiling-microdome-grey-trim-h3-mc-cler1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 17.83,
    priceNGN: 17.83 * 1500,
    description: "Replacement clear transparent cover; includes dome bubble and gray trim for in-ceiling microdomes.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/CLADP-1001-09192023.png"],
    specifications: [
      { label: "SKU", value: "H3-MC-CLER1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 86,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Replacement Clear Dome Cover for H3 In-Ceiling Microdome; Grey Trim Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-12",
    sku: "H3-MC-CLER1-BL",
    name: "Replacement Clear Dome Cover for H3 In-Ceiling Microdome; Black Trim",
    slug: "replacement-clear-dome-cover-for-h3-in-ceiling-microdome-black-trim-h3-mc-cler1-bl",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 17.83,
    priceNGN: 17.83 * 1500,
    description: "Replacement clear transparent cover; includes dome bubble and black trim for in-ceiling microdomes.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6%20Mini%20Dome/H6%20Mini%20Bezel%20Black-02072022.png"],
    specifications: [
      { label: "SKU", value: "H3-MC-CLER1-BL" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 79,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Replacement Clear Dome Cover for H3 In-Ceiling Microdome; Black Trim Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-13",
    sku: "H3-MH-NPTA1",
    name: "Replacement NPT Adapter",
    slug: "replacement-npt-adapter-h3-mh-npta1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 37.18,
    priceNGN: 37.18 * 1500,
    description: "Replacement female NPT adapter for use with H3 PTZ H4 PTZ and H3 Multisensor cameras.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6%20Mini%20Dome/Pendant%20side%20Black-02072022.png"],
    specifications: [
      { label: "SKU", value: "H3-MH-NPTA1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 121,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Replacement NPT Adapter Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-14",
    sku: "H4-DC-CPNL1",
    name: "Metal Ceiling Panel for H5A; H4A; H4SL Dome",
    slug: "metal-ceiling-panel-for-h5a-h4a-h4sl-dome-h4-dc-cpnl1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 141.26,
    priceNGN: 141.26 * 1500,
    description: "Metal ceiling panel for use with H5A; H4A or H4SL-MT-DCIL1 in-ceiling dome cameras to replace or reinforce the existing ceiling tile in suspended ceiling installations.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/MEC-0371B_PANEL_Ceiling_Metal_In-Ceiling_King_Finish-1_071620.jpg"],
    specifications: [
      { label: "SKU", value: "H4-DC-CPNL1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 107,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Metal Ceiling Panel for H5A; H4A; H4SL Dome Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-15",
    sku: "H4A-AC-GROM1",
    name: "Cable Sealing Grommet (pack of 10)",
    slug: "cable-sealing-grommet-pack-of-10-h4a-ac-grom1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 22.75,
    priceNGN: 22.75 * 1500,
    description: "Cable sealing grommet for use with H5A/H4A dome cameras; pack of 10",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/MEC-0132F_GROMMET_PendantCableEntry_King_Finish-1_071620.jpg"],
    specifications: [
      { label: "SKU", value: "H4A-AC-GROM1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 115,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Cable Sealing Grommet (pack of 10) Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-16",
    sku: "H4A-DC-CLER1",
    name: "Replacement H5A/H4A Clear In-Ceiling Dome Cover",
    slug: "replacement-h5ah4a-clear-in-ceiling-dome-cover-h4a-dc-cler1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 59.47,
    priceNGN: 59.47 * 1500,
    description: "Replacement clear transparent cover for H5A/H4A in-ceiling dome camera. Includes dome bubble and grey camera cover.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/CLADP-1001-09192023.png"],
    specifications: [
      { label: "SKU", value: "H4A-DC-CLER1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 71,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Replacement H5A/H4A Clear In-Ceiling Dome Cover Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-17",
    sku: "H4A-DC-CLER1-BL",
    name: "Replacement H5A/H4A Clear In-Ceiling Dome Cover (Black)",
    slug: "replacement-h5ah4a-clear-in-ceiling-dome-cover-black-h4a-dc-cler1-bl",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 59.47,
    priceNGN: 59.47 * 1500,
    description: "Replacement clear transparent cover for H5A/H4A in-ceiling dome camera. Includes dome bubble and black camera cover.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6%20Mini%20Dome/H6%20Mini%20InCeiling%20Bucket%20White-02072022.png"],
    specifications: [
      { label: "SKU", value: "H4A-DC-CLER1-BL" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 73,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Replacement H5A/H4A Clear In-Ceiling Dome Cover (Black) Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-18",
    sku: "H4A-DC-SMOK1",
    name: "Replacement H5A/H4A Smoke In-Ceiling Dome Cover",
    slug: "replacement-h5ah4a-smoke-in-ceiling-dome-cover-h4a-dc-smok1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 59.47,
    priceNGN: 59.47 * 1500,
    description: "Replacement smoked transparent cover for H5A/H4A in-ceiling dome camera. Reduces light transmission by 50%. Not recommended for low light applications or with the integrated IR illuminator. Includes dome bubble and grey camera cover.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6%20Mini%20Dome/H6%20Mini%20InCeiling%20Bucket%20White-02072022.png"],
    specifications: [
      { label: "SKU", value: "H4A-DC-SMOK1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 153,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Replacement H5A/H4A Smoke In-Ceiling Dome Cover Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-19",
    sku: "H4A-DC-SMOK1-BL",
    name: "Replacement H5A/H4A Smoke In-Ceiling Dome Cover (Black)",
    slug: "replacement-h5ah4a-smoke-in-ceiling-dome-cover-black-h4a-dc-smok1-bl",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 59.47,
    priceNGN: 59.47 * 1500,
    description: "Replacement smoked transparent cover for H5A/H4A in-ceiling dome camera. Reduces light transmission by 50%. Not recommended for low light applications or with the integrated IR illuminator. Includes dome bubble and black camera cover.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/H6A-Non-IR-Dome-Bubble.png"],
    specifications: [
      { label: "SKU", value: "H4A-DC-SMOK1-BL" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 173,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Replacement H5A/H4A Smoke In-Ceiling Dome Cover (Black) Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-20",
    sku: "H4A-DD-CLER1",
    name: "Replacement H5A/H4A Clear Indoor Dome Cover",
    slug: "replacement-h5ah4a-clear-indoor-dome-cover-h4a-dd-cler1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 59.47,
    priceNGN: 59.47 * 1500,
    description: "Replacement clear transparent cover for H5A/H4A indoor dome camera. Includes dome bubble and grey camera cover.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/H6A_Dome_34Left_NonMic_IR_01-09052023.png"],
    specifications: [
      { label: "SKU", value: "H4A-DD-CLER1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 96,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Replacement H5A/H4A Clear Indoor Dome Cover Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-21",
    sku: "H4A-DD-CLER1-BL",
    name: "Replacement H5A/H4A Clear Indoor Dome Cover (Black)",
    slug: "replacement-h5ah4a-clear-indoor-dome-cover-black-h4a-dd-cler1-bl",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 59.47,
    priceNGN: 59.47 * 1500,
    description: "Replacement clear transparent cover for H5A/H4A indoor dome camera. Includes dome bubble and black camera cover.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/H6A_Dome_34Left_NonMic_IR_01-09052023.png"],
    specifications: [
      { label: "SKU", value: "H4A-DD-CLER1-BL" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 78,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Replacement H5A/H4A Clear Indoor Dome Cover (Black) Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-22",
    sku: "H4A-DD-SDWL1",
    name: "Sidewall Knockout Plug H5A/H4A Indoor Dome (pack of 5)",
    slug: "sidewall-knockout-plug-h5ah4a-indoor-dome-pack-of-5-h4a-dd-sdwl1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 7.42,
    priceNGN: 7.42 * 1500,
    description: "Replacement sidewall knockout plug for H5A/H4A indoor dome cameras; pack of 5",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/MEC-0265B_071620.jpg"],
    specifications: [
      { label: "SKU", value: "H4A-DD-SDWL1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 181,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Sidewall Knockout Plug H5A/H4A Indoor Dome (pack of 5) Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-23",
    sku: "H4A-DD-SDWL1-BL",
    name: "Black Sidewall Knockout Plug H5A/H4A Indoor Dome (pack of 5)",
    slug: "black-sidewall-knockout-plug-h5ah4a-indoor-dome-pack-of-5-h4a-dd-sdwl1-bl",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 7.42,
    priceNGN: 7.42 * 1500,
    description: "Replacement sidewall knockout plug for H5A/H4A indoor dome cameras; black; pack of 5",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6%20Mini%20Dome/H6%20Mini%20Dome%20Bezel%20White-03212022.png"],
    specifications: [
      { label: "SKU", value: "H4A-DD-SDWL1-BL" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 112,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Black Sidewall Knockout Plug H5A/H4A Indoor Dome (pack of 5) Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-24",
    sku: "H4A-DD-SMOK1",
    name: "Replacement H5A/H4A Smoke Indoor Dome Cover",
    slug: "replacement-h5ah4a-smoke-indoor-dome-cover-h4a-dd-smok1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 59.47,
    priceNGN: 59.47 * 1500,
    description: "Replacement smoked transparent cover for H5A/H4A indoor dome camera. Reduces light transmission by 50%. Not recommended for low light applications or with the integrated IR illuminator. Includes dome bubble and grey camera cover.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/H6A_Dome_34Left_NonMic_IR_01-09052023.png"],
    specifications: [
      { label: "SKU", value: "H4A-DD-SMOK1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 120,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Replacement H5A/H4A Smoke Indoor Dome Cover Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-25",
    sku: "H4A-DD-SMOK1-BL",
    name: "Replacement H5A/H4A Smoke Indoor Dome Cover (Black)",
    slug: "replacement-h5ah4a-smoke-indoor-dome-cover-black-h4a-dd-smok1-bl",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 59.47,
    priceNGN: 59.47 * 1500,
    description: "Replacement smoked transparent cover for H5A/H4A indoor dome camera. Reduces light transmission by 50%. Not recommended for low light applications or with the integrated IR illuminator. Includes dome bubble and black camera cover.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6%20Mini%20Dome/Pendant%20side%20Black-02072022.png"],
    specifications: [
      { label: "SKU", value: "H4A-DD-SMOK1-BL" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 136,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Replacement H5A/H4A Smoke Indoor Dome Cover (Black) Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-26",
    sku: "H4A-DO-CLER1",
    name: "Replacement H5A/H4A Clear Outdoor Dome Cover",
    slug: "replacement-h5ah4a-clear-outdoor-dome-cover-h4a-do-cler1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 89.21,
    priceNGN: 89.21 * 1500,
    description: "Replacement clear transparent cover for H5A/H4A outdoor dome camera. Includes dome bubble and grey camera cover.",
    images: ["https://i.ibb.co/nM0SFS5g/images-21.jpg"],
    specifications: [
      { label: "SKU", value: "H4A-DO-CLER1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 133,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Replacement H5A/H4A Clear Outdoor Dome Cover Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-27",
    sku: "H4A-DP-SMOK1",
    name: "Replacement H5A/H4A Smoke Pendant Dome Cover",
    slug: "replacement-h5ah4a-smoke-pendant-dome-cover-h4a-dp-smok1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 89.21,
    priceNGN: 89.21 * 1500,
    description: "Replacement smoked transparent cover for H5A/H4A pendant dome camera. Reduces light transmission by 50%. Not recommended for low light applications or with the integrated IR illuminator. Includes dome bubble and grey camera cover.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6%20Mini%20Dome/H6%20Mini%20InCeiling%20Bucket%20White-02072022.png"],
    specifications: [
      { label: "SKU", value: "H4A-DP-SMOK1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 177,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Replacement H5A/H4A Smoke Pendant Dome Cover Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-28",
    sku: "H4A-MT-NPTA1",
    name: "NPT Adapter H5A/H4A Pendant Dome Cameras",
    slug: "npt-adapter-h5ah4a-pendant-dome-cameras-h4a-mt-npta1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 89.21,
    priceNGN: 89.21 * 1500,
    description: "NPT adapter for use with H5A/H4A pendant dome cameras",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/MEC-0124D-1_071620.jpg"],
    specifications: [
      { label: "SKU", value: "H4A-MT-NPTA1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 160,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NPT Adapter H5A/H4A Pendant Dome Cameras Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-29",
    sku: "H4A-MT-WALL1",
    name: "Wall Mount for H5A/H4A Pendant Dome Cameras",
    slug: "wall-mount-for-h5ah4a-pendant-dome-cameras-h4a-mt-wall1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 111.08,
    priceNGN: 111.08 * 1500,
    description: "Wall mount bracket for use with H5A/H4A pendant dome cameras",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/Avigilon_H4-Camera_Wall-Mount_Bottom-Angle_070120.jpg"],
    specifications: [
      { label: "SKU", value: "H4A-MT-WALL1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 102,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Wall Mount for H5A/H4A Pendant Dome Cameras Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-30",
    sku: "H4M-BZL1-BL",
    name: "H4M Black Replacement Bezel; pack of 5",
    slug: "h4m-black-replacement-bezel-pack-of-5-h4m-bzl1-bl",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 41.68,
    priceNGN: 41.68 * 1500,
    description: "Black surface mount bezel for H4M dome cameras; package of 5",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/MEC-0649G_BEZEL_Surface-Mount_Pong_Finish-1_070720.jpg"],
    specifications: [
      { label: "SKU", value: "H4M-BZL1-BL" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 131,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "H4M Black Replacement Bezel; pack of 5 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-31",
    sku: "H4M-MT-DSPL",
    name: "H4M Replacement Wall Plate; pack of 5",
    slug: "h4m-replacement-wall-plate-pack-of-5-h4m-mt-dspl",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 41.68,
    priceNGN: 41.68 * 1500,
    description: "Package of 5 Video plates for H4M dome cameras",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/MEC-0647G_WALL-PLATE_Surface-Mount_Pong_Finish_071620.jpg"],
    specifications: [
      { label: "SKU", value: "H4M-MT-DSPL" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 180,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "H4M Replacement Wall Plate; pack of 5 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-32",
    sku: "H4M-MT-NPTA1",
    name: "H4M Grey Pendant Adapter",
    slug: "h4m-grey-pendant-adapter-h4m-mt-npta1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 41.68,
    priceNGN: 41.68 * 1500,
    description: "Pendant mount for H4M dome cameras",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/Avigilon_H4-Mini-Dome_Grey_IR_Pendant_Side_070120.jpg"],
    specifications: [
      { label: "SKU", value: "H4M-MT-NPTA1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 101,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "H4M Grey Pendant Adapter Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-33",
    sku: "H4M-MT-NPTA1-BL",
    name: "H4M Black Pendant Adapter",
    slug: "h4m-black-pendant-adapter-h4m-mt-npta1-bl",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 41.68,
    priceNGN: 41.68 * 1500,
    description: "Pendant mount for H4M dome cameras; Black",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/Avigilon_H4-Mini-Dome_Black_IR_Pendant_Side_071320.jpg"],
    specifications: [
      { label: "SKU", value: "H4M-MT-NPTA1-BL" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 96,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "H4M Black Pendant Adapter Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-34",
    sku: "H4M-WARR-EXTEND-1YR",
    name: "H4 Mini Dome 1 Year Extended Warranty",
    slug: "h4-mini-dome-1-year-extended-warranty-h4m-warr-extend-1yr",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 52.48,
    priceNGN: 52.48 * 1500,
    description: "Extended Warranty for H4 Mini Dome cameras; 1 year extension",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Warranty_070720.jpg"],
    specifications: [
      { label: "SKU", value: "H4M-WARR-EXTEND-1YR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 126,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "H4 Mini Dome 1 Year Extended Warranty Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-35",
    sku: "H4M-WARR-EXTEND-2YR",
    name: "H4 Mini Dome PTZ 2 Years Extended Warranty",
    slug: "h4-mini-dome-ptz-2-years-extended-warranty-h4m-warr-extend-2yr",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 103.5,
    priceNGN: 103.5 * 1500,
    description: "Extended Warranty for H4 Mini Dome cameras; 2 years extension",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/H6A_Dome_34Left_NonMic_IR_01-09052023.png"],
    specifications: [
      { label: "SKU", value: "H4M-WARR-EXTEND-2YR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 146,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "H4 Mini Dome PTZ 2 Years Extended Warranty Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-36",
    sku: "H4SL-AC-CNID1",
    name: "Side Conduit Cover; H5SL/H4SL Dome Camera (pack of 5)",
    slug: "side-conduit-cover-h5slh4sl-dome-camera-pack-of-5-h4sl-ac-cnid1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 14.87,
    priceNGN: 14.87 * 1500,
    description: "Conduit Opening Cover; Grey; 5 pack. For H5SL or H4SL dome cameras.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6%20Mini%20Dome/Pendant%20side%20Black-02072022.png"],
    specifications: [
      { label: "SKU", value: "H4SL-AC-CNID1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 160,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Side Conduit Cover; H5SL/H4SL Dome Camera (pack of 5) Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-37",
    sku: "H4SL-AC-CNPL1",
    name: "1/2\" Conduit Plate; H5SL/H4SL Dome Camera (pack of 5)",
    slug: "12-conduit-plate-h5slh4sl-dome-camera-pack-of-5-h4sl-ac-cnpl1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 22.3,
    priceNGN: 22.3 * 1500,
    description: "Conduit Plate; Grey for 1/2\" 5 pack. For H5SL or H4SL dome cameras.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/CLADP-1001-09192023.png"],
    specifications: [
      { label: "SKU", value: "H4SL-AC-CNPL1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 177,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "1/2\" Conduit Plate; H5SL/H4SL Dome Camera (pack of 5) Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-38",
    sku: "H4SL-AC-CNPL2",
    name: "3/4\" Conduit Plate; H5SL/H4SL Dome Cameras (pack of 5)",
    slug: "34-conduit-plate-h5slh4sl-dome-cameras-pack-of-5-h4sl-ac-cnpl2",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 22.3,
    priceNGN: 22.3 * 1500,
    description: "Conduit Plate; Grey for 3/4\" 5 pack. For H5SL or H4SL dome cameras.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/CLADP-1001-09192023.png"],
    specifications: [
      { label: "SKU", value: "H4SL-AC-CNPL2" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 118,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "3/4\" Conduit Plate; H5SL/H4SL Dome Cameras (pack of 5) Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-39",
    sku: "H4SL-AC-COND1",
    name: "Conduit Cover Grey; H5SL/H4SL Dome Camera (Pack of 5)",
    slug: "conduit-cover-grey-h5slh4sl-dome-camera-pack-of-5-h4sl-ac-cond1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 14.87,
    priceNGN: 14.87 * 1500,
    description: "Conduit Cover; Grey; 5 pack. For H5SL or H4SL dome cameras.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6%20Mini%20Dome/H6%20Mini%20InCeiling%20Bucket%20White-02072022.png"],
    specifications: [
      { label: "SKU", value: "H4SL-AC-COND1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 86,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Conduit Cover Grey; H5SL/H4SL Dome Camera (Pack of 5) Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-40",
    sku: "H4SL-DD-CLER1",
    name: "Replacement Clear Dome Cover for H5SL/H4SL Outdoor Dome Camera",
    slug: "replacement-clear-dome-cover-for-h5slh4sl-outdoor-dome-camera-h4sl-dd-cler1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 44.59,
    priceNGN: 44.59 * 1500,
    description: "Replacement clear transparent cover for H5SL or H4SL outdoor dome camera. Includes dome bubble and grey camera cover.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6%20Mini%20Dome/H6%20Mini%20InCeiling%20Bucket%20White-02072022.png"],
    specifications: [
      { label: "SKU", value: "H4SL-DD-CLER1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 175,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Replacement Clear Dome Cover for H5SL/H4SL Outdoor Dome Camera Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-41",
    sku: "H4SL-MT-DCIL1",
    name: "In-Ceiling Adapter for H5SL/H4SL Dome Cameras",
    slug: "in-ceiling-adapter-for-h5slh4sl-dome-cameras-h4sl-mt-dcil1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 44.59,
    priceNGN: 44.59 * 1500,
    description: "In-Ceiling Adapter for H5SL/H4SL Dome Cameras",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/Avigilon_H4SL-Camera_Dome_In-Ceiling-Adapter_070120.jpg"],
    specifications: [
      { label: "SKU", value: "H4SL-MT-DCIL1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 131,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "In-Ceiling Adapter for H5SL/H4SL Dome Cameras Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-42",
    sku: "H5M-DO-BZL1",
    name: "Package of 4 shroud replacement parts for H5M dome cameras",
    slug: "package-of-4-shroud-replacement-parts-for-h5m-dome-cameras-h5m-do-bzl1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 44.59,
    priceNGN: 44.59 * 1500,
    description: "Package of 4 shroud replacement parts for H5M dome cameras",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/H5M_Camera-Enclosure_Angle_071320.jpg"],
    specifications: [
      { label: "SKU", value: "H5M-DO-BZL1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 156,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Package of 4 shroud replacement parts for H5M dome cameras Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-43",
    sku: "H5M-MT-DCIL1",
    name: "In-ceiling mount adapter for H5M dome cameras",
    slug: "in-ceiling-mount-adapter-for-h5m-dome-cameras-h5m-mt-dcil1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 44.59,
    priceNGN: 44.59 * 1500,
    description: "In-ceiling mount adapter for H5M dome cameras",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/Avigilon_H5M-Camera_In-Ceiling_Angle-%281%29_071320.jpg"],
    specifications: [
      { label: "SKU", value: "H5M-MT-DCIL1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 169,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "In-ceiling mount adapter for H5M dome cameras Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-44",
    sku: "H6A-MT-NPTA1",
    name: "Pendant adapter; NPT; H6A",
    slug: "pendant-adapter-npt-h6a-h6a-mt-npta1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 75.6,
    priceNGN: 75.6 * 1500,
    description: "Pendant adapter; NPT; H6A",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/H6A-MT-NPTA1-09192023.png"],
    specifications: [
      { label: "SKU", value: "H6A-MT-NPTA1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 107,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Pendant adapter; NPT; H6A Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-45",
    sku: "H6M-BZL1-BL",
    name: "H6M Black Replacement Bezel; pack of 5",
    slug: "h6m-black-replacement-bezel-pack-of-5-h6m-bzl1-bl",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 44.77,
    priceNGN: 44.77 * 1500,
    description: "Black surface mount bezel for H6M dome cameras; package of 5",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6%20Mini%20Dome/H6%20Mini%20Bezel%20Black-02072022.png"],
    specifications: [
      { label: "SKU", value: "H6M-BZL1-BL" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 133,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "H6M Black Replacement Bezel; pack of 5 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-46",
    sku: "H6M-BZL1-GRY",
    name: "H6M Grey Replacement Bezel; pack of 5",
    slug: "h6m-grey-replacement-bezel-pack-of-5-h6m-bzl1-gry",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 44.77,
    priceNGN: 44.77 * 1500,
    description: "Grey surface mount bezel for H6M dome cameras; package of 5",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6%20Mini%20Dome/H6%20Mini%20Dome%20Bezel%20White-03212022.png"],
    specifications: [
      { label: "SKU", value: "H6M-BZL1-GRY" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 112,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "H6M Grey Replacement Bezel; pack of 5 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-47",
    sku: "H6M-MT-DCIL1",
    name: "H6M Grey In-Ceiling Adapter",
    slug: "h6m-grey-in-ceiling-adapter-h6m-mt-dcil1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 51.49,
    priceNGN: 51.49 * 1500,
    description: "In-Ceiling mount for H6M dome cameras",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6%20Mini%20Dome/H6%20Mini%20InCeiling%20Bucket%20White-02072022.png"],
    specifications: [
      { label: "SKU", value: "H6M-MT-DCIL1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 109,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "H6M Grey In-Ceiling Adapter Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-48",
    sku: "H6M-MT-DCIL1-BL",
    name: "H6M Black In-Ceiling Adapter",
    slug: "h6m-black-in-ceiling-adapter-h6m-mt-dcil1-bl",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 51.49,
    priceNGN: 51.49 * 1500,
    description: "In-Ceiling mount for H6M dome cameras; Black",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6%20Mini%20Dome/H6%20Mini%20InCeiling%20Bucket%20Black-02072022.png"],
    specifications: [
      { label: "SKU", value: "H6M-MT-DCIL1-BL" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 177,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "H6M Black In-Ceiling Adapter Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-49",
    sku: "H6M-MT-NPTA1-BL",
    name: "H6M Black Pendant Adapter",
    slug: "h6m-black-pendant-adapter-h6m-mt-npta1-bl",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 44.77,
    priceNGN: 44.77 * 1500,
    description: "Pendant mount for H6M dome cameras; Black",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6%20Mini%20Dome/Pendant%20side%20Black-02072022.png"],
    specifications: [
      { label: "SKU", value: "H6M-MT-NPTA1-BL" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 73,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "H6M Black Pendant Adapter Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-50",
    sku: "H6SL-DD-CLER1",
    name: "Replacement Clear Dome Cover for H6SL Outdoor Dome Camera",
    slug: "replacement-clear-dome-cover-for-h6sl-outdoor-dome-camera-h6sl-dd-cler1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 44.1,
    priceNGN: 44.1 * 1500,
    description: "Replacement clear come cover for H6SL outdoor dome camera. Includes dome bubble and camera cover",
    images: ["https://i.ibb.co/nM0SFS5g/images-21.jpg"],
    specifications: [
      { label: "SKU", value: "H6SL-DD-CLER1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 138,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Replacement Clear Dome Cover for H6SL Outdoor Dome Camera Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-51",
    sku: "H6SL-DD-SMOK1",
    name: "H6SL-DD-SMOK1",
    slug: "h6sl-dd-smok1-h6sl-dd-smok1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 44.1,
    priceNGN: 44.1 * 1500,
    description: "Replacement smoked transparent cover for H6SL outdoor dome camera. Reduces light transmission by 50%. Not recommended for low light applications where the integrated IR illuminator is used. Includes dome bubble and camera cover.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6%20Mini%20Dome/Pendant%20side%20Black-02072022.png"],
    specifications: [
      { label: "SKU", value: "H6SL-DD-SMOK1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 134,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "H6SL-DD-SMOK1 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-52",
    sku: "H6SL-DI-CLER1",
    name: "Replacement Clear Dome Cover for H6SL Indoor Dome Camera",
    slug: "replacement-clear-dome-cover-for-h6sl-indoor-dome-camera-h6sl-di-cler1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 44.1,
    priceNGN: 44.1 * 1500,
    description: "Replacement clear come cover for H6SL indoor dome camera. Includes dome bubble and camera cover",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/H6A_Dome_34Left_NonMic_IR_01-09052023.png"],
    specifications: [
      { label: "SKU", value: "H6SL-DI-CLER1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 129,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Replacement Clear Dome Cover for H6SL Indoor Dome Camera Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-53",
    sku: "H6SL-DI-SMOK1",
    name: "Replacement Clear Smoke Cover for H6SL Indoor Dome Camera",
    slug: "replacement-clear-smoke-cover-for-h6sl-indoor-dome-camera-h6sl-di-smok1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 44.1,
    priceNGN: 44.1 * 1500,
    description: "Replacement smoked transparent cover for H6SL indoor dome camera. Reduces light transmission by 50%. Not recommended for low light applications where the integrated IR illuminator is used. Includes dome bubble and camera cover.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/H6A-Non-IR-Dome-Bubble.png"],
    specifications: [
      { label: "SKU", value: "H6SL-DI-SMOK1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 117,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Replacement Clear Smoke Cover for H6SL Indoor Dome Camera Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-54",
    sku: "H6SL-DO-SHLD1",
    name: "Weather Shield for H6SL Outdoor Dome Cameras",
    slug: "weather-shield-for-h6sl-outdoor-dome-cameras-h6sl-do-shld1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 26.46,
    priceNGN: 26.46 * 1500,
    description: "Weather Shield for H6SL Outdoor Dome Cameras",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6SL/H6SL_SunShade.SunShade%20V3-03092023.png"],
    specifications: [
      { label: "SKU", value: "H6SL-DO-SHLD1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 113,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Weather Shield for H6SL Outdoor Dome Cameras Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-55",
    sku: "MSI-CAMD-GROM-10PK",
    name: "Grommet Cable Seal; H5SL/H4SL Dome Camera (pack of 10)",
    slug: "grommet-cable-seal-h5slh4sl-dome-camera-pack-of-10-msi-camd-grom-10pk",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 22.3,
    priceNGN: 22.3 * 1500,
    description: "Rubber grommet cable seal; 10 pack. For H5SL or H4SL dome cameras.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/H6A-Non-IR-Dome-Bubble.png"],
    specifications: [
      { label: "SKU", value: "MSI-CAMD-GROM-10PK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 96,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Grommet Cable Seal; H5SL/H4SL Dome Camera (pack of 10) Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-56",
    sku: "MSI-LD-0E",
    name: "MSI-LD-0E",
    slug: "msi-ld-0e-msi-ld-0e",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 44.1,
    priceNGN: 44.1 * 1500,
    description: "COVER; Repl; 50% Smoke; Grey; Odr; Mini",
    images: ["https://i.ibb.co/TMJ9L0pR/images-18.jpg"],
    specifications: [
      { label: "SKU", value: "MSI-LD-0E" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 109,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "MSI-LD-0E Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-57",
    sku: "MSI-LD-1E",
    name: "MSI-LD-1E",
    slug: "msi-ld-1e-msi-ld-1e",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 44.1,
    priceNGN: 44.1 * 1500,
    description: "COVER; Repl; Clear; Grey; Odr; Mini",
    images: ["https://i.ibb.co/4Rwb4Xnw/download.webp"],
    specifications: [
      { label: "SKU", value: "MSI-LD-1E" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 174,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "MSI-LD-1E Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-58",
    sku: "MSI-MT-ECLR",
    name: "MSI-MT-ECLR",
    slug: "msi-mt-eclr-msi-mt-eclr",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 36,
    priceNGN: 36 * 1500,
    description: "MOUNT; Side Conduit; Odr; Mini",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "MSI-MT-ECLR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 125,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "MSI-MT-ECLR Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-59",
    sku: "SLSPCIL-1001",
    name: "In-ceiling mount for 6.1\" (156mm) Dome camera",
    slug: "in-ceiling-mount-for-61-156mm-dome-camera-slspcil-1001",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 41.58,
    priceNGN: 41.58 * 1500,
    description: "In-ceiling mount for 6.1\" (156mm) Dome camera",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "SLSPCIL-1001" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 135,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "In-ceiling mount for 6.1\" (156mm) Dome camera Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-60",
    sku: "2.0C-H5A-DC2",
    name: "2MP H5A In-Ceiling Dome Camera with 9-22mm Lens",
    slug: "2mp-h5a-in-ceiling-dome-camera-with-9-22mm-lens-20c-h5a-dc2",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 1472.94,
    priceNGN: 1472.94 * 1500,
    description: "2.0 MP (1080p) WDR; LightCatcher; Day/Night; In-Ceiling Dome; 9-22mm f/1.6 P-iris lens; Next-Generation Analytics",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/Avigilon_H5A-Camera_Dome-IR_Side_062020.jpg"],
    specifications: [
      { label: "SKU", value: "2.0C-H5A-DC2" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 139,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "2MP H5A In-Ceiling Dome Camera with 9-22mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-61",
    sku: "2.0C-H6A-D1-B",
    name: "2MP H6A Indoor Dome Camera with 2.8-12mm Lens",
    slug: "2mp-h6a-indoor-dome-camera-with-28-12mm-lens-20c-h6a-d1-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 1258.8,
    priceNGN: 1258.8 * 1500,
    description: "2MP H6A Indoor Dome Camera with 2.8-12mm Lens",
    images: ["https://i.ibb.co/TMJ9L0pR/images-18.jpg"],
    specifications: [
      { label: "SKU", value: "2.0C-H6A-D1-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 153,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "2MP H6A Indoor Dome Camera with 2.8-12mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-62",
    sku: "2.0C-H6A-D1-IR-B",
    name: "2MP H6A Indoor IR Dome Camera with 2.8-12mm Lens",
    slug: "2mp-h6a-indoor-ir-dome-camera-with-28-12mm-lens-20c-h6a-d1-ir-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 1330.8,
    priceNGN: 1330.8 * 1500,
    description: "2MP H6A Indoor IR Dome Camera with 2.8-12mm Lens",
    images: ["https://i.ibb.co/B5M1tQs0/images-17.jpg"],
    specifications: [
      { label: "SKU", value: "2.0C-H6A-D1-IR-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 184,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "2MP H6A Indoor IR Dome Camera with 2.8-12mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-63",
    sku: "2.0C-H6A-D2",
    name: "2MP H6A Indoor Dome Camera with 10.9-29mm Lens",
    slug: "2mp-h6a-indoor-dome-camera-with-109-29mm-lens-20c-h6a-d2",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 1330.8,
    priceNGN: 1330.8 * 1500,
    description: "2MP H6A Indoor Dome Camera with 10.9-29mm Lens",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/H6A_Dome_34Left_Mic_NonIR_01-09052023.png"],
    specifications: [
      { label: "SKU", value: "2.0C-H6A-D2" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 130,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "2MP H6A Indoor Dome Camera with 10.9-29mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-64",
    sku: "2.0C-H6A-D2-IR",
    name: "2MP H6A Indoor IR Dome Camera with 10.9-29mm Lens",
    slug: "2mp-h6a-indoor-ir-dome-camera-with-109-29mm-lens-20c-h6a-d2-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 1402.8,
    priceNGN: 1402.8 * 1500,
    description: "2MP H6A Indoor IR Dome Camera with 10.9-29mm Lens",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/H6A_Dome_34Left_Mic_IR_01-09052023.png"],
    specifications: [
      { label: "SKU", value: "2.0C-H6A-D2-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 142,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "2MP H6A Indoor IR Dome Camera with 10.9-29mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-65",
    sku: "2.0C-H6A-DO1",
    name: "2MP H6A Outdoor Dome Camera with 2.8-12mm Lens",
    slug: "2mp-h6a-outdoor-dome-camera-with-28-12mm-lens-20c-h6a-do1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 1498.8,
    priceNGN: 1498.8 * 1500,
    description: "2MP H6A Outdoor Dome Camera with 2.8-12mm Lens",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/H6A_Dome_34Left_Mic_NonIR_01-09052023.png"],
    specifications: [
      { label: "SKU", value: "2.0C-H6A-DO1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 122,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "2MP H6A Outdoor Dome Camera with 2.8-12mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-66",
    sku: "4.0C-H6A-D1-IR-B",
    name: "4MP H6A Indoor IR Dome Camera with 4.4-9.3mm Lens",
    slug: "4mp-h6a-indoor-ir-dome-camera-with-44-93mm-lens-40c-h6a-d1-ir-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 1630.8,
    priceNGN: 1630.8 * 1500,
    description: "4MP H6A Indoor IR Dome Camera with 4.4-9.3mm Lens",
    images: ["https://i.ibb.co/B5M1tQs0/images-17.jpg"],
    specifications: [
      { label: "SKU", value: "4.0C-H6A-D1-IR-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 159,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "4MP H6A Indoor IR Dome Camera with 4.4-9.3mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-67",
    sku: "4.0C-H6A-D2",
    name: "4MP H6A Indoor Dome Camera with 10.9-29mm Lens",
    slug: "4mp-h6a-indoor-dome-camera-with-109-29mm-lens-40c-h6a-d2",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 1630.79,
    priceNGN: 1630.79 * 1500,
    description: "4MP H6A Indoor Dome Camera with 10.9-29mm Lens",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/H6A_Dome_34Left_Mic_NonIR_01-09052023.png"],
    specifications: [
      { label: "SKU", value: "4.0C-H6A-D2" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 81,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "4MP H6A Indoor Dome Camera with 10.9-29mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-68",
    sku: "4.0C-H6A-DO1-IR",
    name: "4MP H6A Outdoor IR Dome Camera with 4.4-9.3mm Lens",
    slug: "4mp-h6a-outdoor-ir-dome-camera-with-44-93mm-lens-40c-h6a-do1-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 1870.8,
    priceNGN: 1870.8 * 1500,
    description: "4MP H6A Outdoor IR Dome Camera with 4.4-9.3mm Lens",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/H6A_Dome_34Left_Mic_IR_01-09052023.png"],
    specifications: [
      { label: "SKU", value: "4.0C-H6A-DO1-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 127,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "4MP H6A Outdoor IR Dome Camera with 4.4-9.3mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-69",
    sku: "4.0C-H6A-DO1-IR-B",
    name: "4MP H6A Outdoor IR Dome Camera with 4.4-9.3mm Lens",
    slug: "4mp-h6a-outdoor-ir-dome-camera-with-44-93mm-lens-40c-h6a-do1-ir-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 1870.8,
    priceNGN: 1870.8 * 1500,
    description: "4MP H6A Outdoor IR Dome Camera with 4.4-9.3mm Lens",
    images: ["https://i.ibb.co/nM0SFS5g/images-21.jpg"],
    specifications: [
      { label: "SKU", value: "4.0C-H6A-DO1-IR-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 177,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "4MP H6A Outdoor IR Dome Camera with 4.4-9.3mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-70",
    sku: "4.0C-H6A-DO2",
    name: "4MP H6A Outdoor Dome Camera with 10.9-29mm Lens",
    slug: "4mp-h6a-outdoor-dome-camera-with-109-29mm-lens-40c-h6a-do2",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 1870.8,
    priceNGN: 1870.8 * 1500,
    description: "4MP H6A Outdoor Dome Camera with 10.9-29mm Lens",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/H6A_Dome_34Left_Mic_NonIR_01-09052023.png"],
    specifications: [
      { label: "SKU", value: "4.0C-H6A-DO2" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "4MP H6A Outdoor Dome Camera with 10.9-29mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-71",
    sku: "4.0C-H6X-DO1-IR",
    name: "4MP H6X Outdoor IR Dome Camera with 4.4-9.3mm Lens",
    slug: "4mp-h6x-outdoor-ir-dome-camera-with-44-93mm-lens-40c-h6x-do1-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 2062.34,
    priceNGN: 2062.34 * 1500,
    description: "4MP H6X Outdoor IR Dome Camera with 4.4-9.3mm Lens",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/H6A_Dome_34Left_NonMic_IR_01-09052023.png"],
    specifications: [
      { label: "SKU", value: "4.0C-H6X-DO1-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 103,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "4MP H6X Outdoor IR Dome Camera with 4.4-9.3mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-72",
    sku: "4.0C-H6X-DO2-IR",
    name: "4MP H6X Outdoor IR Dome Camera with 10.9-29mm Lens",
    slug: "4mp-h6x-outdoor-ir-dome-camera-with-109-29mm-lens-40c-h6x-do2-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 2129.12,
    priceNGN: 2129.12 * 1500,
    description: "4MP H6X Outdoor IR Dome Camera with 10.9-29mm Lens",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/H6A_Dome_34Left_NonMic_IR_01-09052023.png"],
    specifications: [
      { label: "SKU", value: "4.0C-H6X-DO2-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 148,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "4MP H6X Outdoor IR Dome Camera with 10.9-29mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-73",
    sku: "4.0C-H6XP-DO1-IR-NA",
    name: "4.0C-H6XP-DO1-IR-NA",
    slug: "40c-h6xp-do1-ir-na-40c-h6xp-do1-ir-na",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 2232.72,
    priceNGN: 2232.72 * 1500,
    description: "4MP H6XP Outdoor IR Dome Camera with 4.4-9.3mm Lens & Z-Wave Hub (908.4 MHz)",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6XP/H6XP_Dome_34Left_Mic_IR_01.png"],
    specifications: [
      { label: "SKU", value: "4.0C-H6XP-DO1-IR-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 174,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "4.0C-H6XP-DO1-IR-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-74",
    sku: "6.0C-H6A-D1",
    name: "6MP H6A Indoor Dome Camera with 4.4-9.3mm Lens",
    slug: "6mp-h6a-indoor-dome-camera-with-44-93mm-lens-60c-h6a-d1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 1726.8,
    priceNGN: 1726.8 * 1500,
    description: "6MP H6A Indoor Dome Camera with 4.4-9.3mm Lens",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/H6A_Dome_34Left_Mic_NonIR_01-09052023.png"],
    specifications: [
      { label: "SKU", value: "6.0C-H6A-D1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 137,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "6MP H6A Indoor Dome Camera with 4.4-9.3mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-75",
    sku: "6.0C-H6A-D1-IR-B",
    name: "6MP H6A Indoor IR Dome Camera with 4.4-9.3mm Lens",
    slug: "6mp-h6a-indoor-ir-dome-camera-with-44-93mm-lens-60c-h6a-d1-ir-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 1798.8,
    priceNGN: 1798.8 * 1500,
    description: "6MP H6A Indoor IR Dome Camera with 4.4-9.3mm Lens",
    images: ["https://i.ibb.co/4Rwb4Xnw/download.webp"],
    specifications: [
      { label: "SKU", value: "6.0C-H6A-D1-IR-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 88,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "6MP H6A Indoor IR Dome Camera with 4.4-9.3mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-76",
    sku: "6.0C-H6A-D2",
    name: "6MP H6A Indoor Dome Camera with 10.9-29mm Lens",
    slug: "6mp-h6a-indoor-dome-camera-with-109-29mm-lens-60c-h6a-d2",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 1798.8,
    priceNGN: 1798.8 * 1500,
    description: "6MP H6A Indoor Dome Camera with 10.9-29mm Lens",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/H6A_Dome_34Left_Mic_NonIR_01-09052023.png"],
    specifications: [
      { label: "SKU", value: "6.0C-H6A-D2" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 163,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "6MP H6A Indoor Dome Camera with 10.9-29mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-77",
    sku: "6.0C-H6A-DO1",
    name: "6MP H6A Outdoor Dome Camera with 4.4-9.3mm Lens",
    slug: "6mp-h6a-outdoor-dome-camera-with-44-93mm-lens-60c-h6a-do1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 1966.8,
    priceNGN: 1966.8 * 1500,
    description: "6MP H6A Outdoor Dome Camera with 4.4-9.3mm Lens",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/H6A_Dome_34Left_Mic_NonIR_01-09052023.png"],
    specifications: [
      { label: "SKU", value: "6.0C-H6A-DO1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 159,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "6MP H6A Outdoor Dome Camera with 4.4-9.3mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-78",
    sku: "6.0C-H6A-DO1-IR",
    name: "6MP H6A Outdoor IR Dome Camera with 4.4-9.3mm Lens",
    slug: "6mp-h6a-outdoor-ir-dome-camera-with-44-93mm-lens-60c-h6a-do1-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 2038.79,
    priceNGN: 2038.79 * 1500,
    description: "6MP H6A Outdoor IR Dome Camera with 4.4-9.3mm Lens",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/H6A_Dome_34Left_Mic_IR_01-09052023.png"],
    specifications: [
      { label: "SKU", value: "6.0C-H6A-DO1-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 122,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "6MP H6A Outdoor IR Dome Camera with 4.4-9.3mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-79",
    sku: "6.0C-H6A-DO1-IR-B",
    name: "6MP H6A Outdoor IR Dome Camera with 4.4-9.3mm Lens",
    slug: "6mp-h6a-outdoor-ir-dome-camera-with-44-93mm-lens-60c-h6a-do1-ir-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 2038.79,
    priceNGN: 2038.79 * 1500,
    description: "6MP H6A Outdoor IR Dome Camera with 4.4-9.3mm Lens",
    images: ["https://i.ibb.co/nM0SFS5g/images-21.jpg"],
    specifications: [
      { label: "SKU", value: "6.0C-H6A-DO1-IR-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 128,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "6MP H6A Outdoor IR Dome Camera with 4.4-9.3mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-80",
    sku: "6.0C-H6A-DO2-IR",
    name: "6MP H6A Outdoor IR Dome Camera with 10.9-29mm Lens",
    slug: "6mp-h6a-outdoor-ir-dome-camera-with-109-29mm-lens-60c-h6a-do2-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 2110.8,
    priceNGN: 2110.8 * 1500,
    description: "6MP H6A Outdoor IR Dome Camera with 10.9-29mm Lens",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/H6A_Dome_34Left_Mic_IR_01-09052023.png"],
    specifications: [
      { label: "SKU", value: "6.0C-H6A-DO2-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 157,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "6MP H6A Outdoor IR Dome Camera with 10.9-29mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-81",
    sku: "8.0C-H6A-D1",
    name: "8MP H6A Indoor Dome Camera with 4.4-9.3mm Lens",
    slug: "8mp-h6a-indoor-dome-camera-with-44-93mm-lens-80c-h6a-d1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 2026.8,
    priceNGN: 2026.8 * 1500,
    description: "8MP H6A Indoor Dome Camera with 4.4-9.3mm Lens",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/H6A_Dome_34Left_Mic_NonIR_01-09052023.png"],
    specifications: [
      { label: "SKU", value: "8.0C-H6A-D1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 76,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "8MP H6A Indoor Dome Camera with 4.4-9.3mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-82",
    sku: "8.0C-H6A-D1-IR-B",
    name: "8MP H6A Indoor IR Dome Camera with 4.4-9.3mm Lens",
    slug: "8mp-h6a-indoor-ir-dome-camera-with-44-93mm-lens-80c-h6a-d1-ir-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 2098.8,
    priceNGN: 2098.8 * 1500,
    description: "8MP H6A Indoor IR Dome Camera with 4.4-9.3mm Lens",
    images: ["https://i.ibb.co/4Rwb4Xnw/download.webp"],
    specifications: [
      { label: "SKU", value: "8.0C-H6A-D1-IR-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 89,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "8MP H6A Indoor IR Dome Camera with 4.4-9.3mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-83",
    sku: "8.0C-H6A-DO1",
    name: "8MP H6A Outdoor Dome Camera with 4.4-9.3mm Lens",
    slug: "8mp-h6a-outdoor-dome-camera-with-44-93mm-lens-80c-h6a-do1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 2266.8,
    priceNGN: 2266.8 * 1500,
    description: "8MP H6A Outdoor Dome Camera with 4.4-9.3mm Lens",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/H6A_Dome_34Left_Mic_NonIR_01-09052023.png"],
    specifications: [
      { label: "SKU", value: "8.0C-H6A-DO1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 70,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "8MP H6A Outdoor Dome Camera with 4.4-9.3mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-84",
    sku: "8.0C-H6A-DO1-IR",
    name: "8MP H6A Outdoor IR Dome Camera with 4.4-9.3mm Lens",
    slug: "8mp-h6a-outdoor-ir-dome-camera-with-44-93mm-lens-80c-h6a-do1-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 2338.8,
    priceNGN: 2338.8 * 1500,
    description: "8MP H6A Outdoor IR Dome Camera with 4.4-9.3mm Lens",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/H6A_Dome_34Left_Mic_IR_01-09052023.png"],
    specifications: [
      { label: "SKU", value: "8.0C-H6A-DO1-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 70,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "8MP H6A Outdoor IR Dome Camera with 4.4-9.3mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-85",
    sku: "8.0C-H6A-DO1-IR-B",
    name: "8MP H6A Outdoor IR Dome Camera with 4.4-9.3mm Lens",
    slug: "8mp-h6a-outdoor-ir-dome-camera-with-44-93mm-lens-80c-h6a-do1-ir-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 2338.8,
    priceNGN: 2338.8 * 1500,
    description: "8MP H6A Outdoor IR Dome Camera with 4.4-9.3mm Lens",
    images: ["https://i.ibb.co/B5M1tQs0/images-17.jpg"],
    specifications: [
      { label: "SKU", value: "8.0C-H6A-DO1-IR-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 150,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "8MP H6A Outdoor IR Dome Camera with 4.4-9.3mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-86",
    sku: "8.0C-H6A-DO2",
    name: "8MP H6A Outdoor Dome Camera with 10.9-29mm Lens",
    slug: "8mp-h6a-outdoor-dome-camera-with-109-29mm-lens-80c-h6a-do2",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 2338.8,
    priceNGN: 2338.8 * 1500,
    description: "8MP H6A Outdoor Dome Camera with 10.9-29mm Lens",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/H6A_Dome_34Left_Mic_NonIR_01-09052023.png"],
    specifications: [
      { label: "SKU", value: "8.0C-H6A-DO2" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 150,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "8MP H6A Outdoor Dome Camera with 10.9-29mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-87",
    sku: "8.0C-H6A-DO2-IR",
    name: "8MP H6A Outdoor IR Dome Camera with 10.9-29mm Lens",
    slug: "8mp-h6a-outdoor-ir-dome-camera-with-109-29mm-lens-80c-h6a-do2-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 2410.8,
    priceNGN: 2410.8 * 1500,
    description: "8MP H6A Outdoor IR Dome Camera with 10.9-29mm Lens",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/H6A_Dome_34Left_Mic_IR_01-09052023.png"],
    specifications: [
      { label: "SKU", value: "8.0C-H6A-DO2-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 86,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "8MP H6A Outdoor IR Dome Camera with 10.9-29mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-88",
    sku: "8.0C-H6X-DO1-IR",
    name: "8MP H6X Outdoor IR Dome Camera with 4.4-9.3mm Lens",
    slug: "8mp-h6x-outdoor-ir-dome-camera-with-44-93mm-lens-80c-h6x-do1-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 2624.62,
    priceNGN: 2624.62 * 1500,
    description: "8MP H6X Outdoor IR Dome Camera with 4.4-9.3mm Lens",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6A-X-XP%20Camera%20Line/H6A_Dome_34Left_NonMic_IR_01-09052023.png"],
    specifications: [
      { label: "SKU", value: "8.0C-H6X-DO1-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 180,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "8MP H6X Outdoor IR Dome Camera with 4.4-9.3mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-89",
    sku: "2.0C-H6SL-D1",
    name: "2MP H6SL Indoor Dome Camera with 3.4-10.5mm Lens",
    slug: "2mp-h6sl-indoor-dome-camera-with-34-105mm-lens-20c-h6sl-d1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 718.79,
    priceNGN: 718.79 * 1500,
    description: "2.0 MP; WDR; LightCatcher; Day/Night; Indoor Dome; 3.4-10.5mm f/1.6",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6SL/H6SL_Surface-03092023.png"],
    specifications: [
      { label: "SKU", value: "2.0C-H6SL-D1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 78,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "2MP H6SL Indoor Dome Camera with 3.4-10.5mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-90",
    sku: "2.0C-H6SL-D1-IR",
    name: "2MP H6SL Indoor IR Dome Camera with 3.4-10.5mm Lens",
    slug: "2mp-h6sl-indoor-ir-dome-camera-with-34-105mm-lens-20c-h6sl-d1-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 778.79,
    priceNGN: 778.79 * 1500,
    description: "2.0 MP; WDR; LightCatcher; Day/Night; Indoor Dome; 3.4-10.5mm f/1.6; Integrated IR",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6SL/H6SL_Surface-03092023.png"],
    specifications: [
      { label: "SKU", value: "2.0C-H6SL-D1-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 141,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "2MP H6SL Indoor IR Dome Camera with 3.4-10.5mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-91",
    sku: "2.0C-H6SL-DO1-IR",
    name: "2MP H6SL Outdoor IR Dome Camera with 3.4-10.5mm Lens",
    slug: "2mp-h6sl-outdoor-ir-dome-camera-with-34-105mm-lens-20c-h6sl-do1-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 910.8,
    priceNGN: 910.8 * 1500,
    description: "2.0 MP; WDR; LightCatcher; Day/Night; Outdoor Dome; 3.4-10.5mm f/1.6; Integrated IR",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6SL/H6SL_Surface-03092023.png"],
    specifications: [
      { label: "SKU", value: "2.0C-H6SL-DO1-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 90,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "2MP H6SL Outdoor IR Dome Camera with 3.4-10.5mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-92",
    sku: "3.0C-H6SL-D1",
    name: "3MP H6SL Indoor Dome Camera with 3.4-10.5mm Lens",
    slug: "3mp-h6sl-indoor-dome-camera-with-34-105mm-lens-30c-h6sl-d1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 838.8,
    priceNGN: 838.8 * 1500,
    description: "3.0 MP; WDR; LightCatcher; Day/Night; Indoor Dome; 3.4-10.5mm f/1.6",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6SL/H6SL_Surface-03092023.png"],
    specifications: [
      { label: "SKU", value: "3.0C-H6SL-D1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 79,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "3MP H6SL Indoor Dome Camera with 3.4-10.5mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-93",
    sku: "3.0C-H6SL-D1-IR",
    name: "3MP H6SL Indoor IR Dome Camera with 3.4-10.5mm Lens",
    slug: "3mp-h6sl-indoor-ir-dome-camera-with-34-105mm-lens-30c-h6sl-d1-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 898.8,
    priceNGN: 898.8 * 1500,
    description: "3.0 MP; WDR; LightCatcher; Day/Night; Indoor Dome; 3.4-10.5mm f/1.6; Integrated IR",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6SL/H6SL_Surface-03092023.png"],
    specifications: [
      { label: "SKU", value: "3.0C-H6SL-D1-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 71,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "3MP H6SL Indoor IR Dome Camera with 3.4-10.5mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-94",
    sku: "3.0C-H6SL-DO1-IR",
    name: "3MP H6SL Outdoor IR Dome Camera with 3.4-10.5mm Lens",
    slug: "3mp-h6sl-outdoor-ir-dome-camera-with-34-105mm-lens-30c-h6sl-do1-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 1042.8,
    priceNGN: 1042.8 * 1500,
    description: "3.0 MP; WDR; LightCatcher; Day/Night; Outdoor Dome; 3.4-10.5mm f/1.6 Integrated IR",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6SL/H6SL_Surface-03092023.png"],
    specifications: [
      { label: "SKU", value: "3.0C-H6SL-DO1-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 70,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "3MP H6SL Outdoor IR Dome Camera with 3.4-10.5mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-95",
    sku: "5.0C-H6SL-D1",
    name: "5MP H6SL Indoor Dome Camera with 3.4-10.5mm Lens",
    slug: "5mp-h6sl-indoor-dome-camera-with-34-105mm-lens-50c-h6sl-d1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 1054.81,
    priceNGN: 1054.81 * 1500,
    description: "5.0 MP; WDR; LightCatcher; Day/Night; Indoor Dome; 3.4-10.5mm f/1.6",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6SL/H6SL_Surface-03092023.png"],
    specifications: [
      { label: "SKU", value: "5.0C-H6SL-D1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 144,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "5MP H6SL Indoor Dome Camera with 3.4-10.5mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-96",
    sku: "5.0C-H6SL-D1-IR",
    name: "5MP H6SL Indoor IR Dome Camera with 3.4-10.5mm Lens",
    slug: "5mp-h6sl-indoor-ir-dome-camera-with-34-105mm-lens-50c-h6sl-d1-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 1114.81,
    priceNGN: 1114.81 * 1500,
    description: "5.0 MP; WDR; LightCatcher; Day/Night; Indoor Dome; 3.4-10.5mm f/1.6; Integrated IR",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6SL/H6SL_Surface-03092023.png"],
    specifications: [
      { label: "SKU", value: "5.0C-H6SL-D1-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 137,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "5MP H6SL Indoor IR Dome Camera with 3.4-10.5mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-97",
    sku: "5.0C-H6SL-DO1-IR",
    name: "5MP H6SL Outdoor IR Dome Camera with 3.4-10.5mm Lens",
    slug: "5mp-h6sl-outdoor-ir-dome-camera-with-34-105mm-lens-50c-h6sl-do1-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 1258.79,
    priceNGN: 1258.79 * 1500,
    description: "5.0 MP; WDR; LightCatcher; Day/Night; Outdoor Dome; 3.4-10.5mm f/1.6; Integrated IR",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6SL/H6SL_Surface-03092023.png"],
    specifications: [
      { label: "SKU", value: "5.0C-H6SL-DO1-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 101,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "5MP H6SL Outdoor IR Dome Camera with 3.4-10.5mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-98",
    sku: "8.0C-H6SL-DO1-IR-B",
    name: "8MP H6SL Outdoor IR Dome Camera with 4.4-9.3mm Lens",
    slug: "8mp-h6sl-outdoor-ir-dome-camera-with-44-93mm-lens-80c-h6sl-do1-ir-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 1558.62,
    priceNGN: 1558.62 * 1500,
    description: "CAM;H6SL;Odr;8.0MP;WDR/LL;4.4-9.3mm;IR",
    images: ["https://i.ibb.co/nM0SFS5g/images-21.jpg"],
    specifications: [
      { label: "SKU", value: "8.0C-H6SL-DO1-IR-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 114,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "8MP H6SL Outdoor IR Dome Camera with 4.4-9.3mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-99",
    sku: "2.0C-H5M-DO1-IR",
    name: "2MP H5M Dome Camera with 2.8mm lens",
    slug: "2mp-h5m-dome-camera-with-28mm-lens-20c-h5m-do1-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 661.92,
    priceNGN: 661.92 * 1500,
    description: "2.0 MP WDR; LightCatcher; Day/Night; Outdoor Dome; 2.8mm f/1.2; IR",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/Avigilon_H5M-Camera_Surface_Angle_070120.jpg"],
    specifications: [
      { label: "SKU", value: "2.0C-H5M-DO1-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 152,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "2MP H5M Dome Camera with 2.8mm lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-100",
    sku: "2.0C-H6M-D1",
    name: "2.0C-H6M-D1",
    slug: "20c-h6m-d1-20c-h6m-d1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 526.8,
    priceNGN: 526.8 * 1500,
    description: "2.0 MP; H6 Mini Dome Camera; WDR; LightCatcher; Day/Night; 2.9mm f/2.0",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6%20Mini%20Dome/Surface%20Side%20White.2613-02072022.png"],
    specifications: [
      { label: "SKU", value: "2.0C-H6M-D1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 79,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "2.0C-H6M-D1 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-101",
    sku: "2.0C-H6M-D1-IR",
    name: "2.0C-H6M-D1-IR",
    slug: "20c-h6m-d1-ir-20c-h6m-d1-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 574.8,
    priceNGN: 574.8 * 1500,
    description: "2.0 MP; H6 Mini Dome Camera; WDR; LightCatcher; Day/Night; 2.9mm f/2.0; IR",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6%20Mini%20Dome/Surface%20Side%20White.2613-02072022.png"],
    specifications: [
      { label: "SKU", value: "2.0C-H6M-D1-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 183,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "2.0C-H6M-D1-IR Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-102",
    sku: "2.0C-H6M-DO1-IR",
    name: "2MP H6M Outdoor Mini-Dome with IR and 3.0mm Lens",
    slug: "2mp-h6m-outdoor-mini-dome-with-ir-and-30mm-lens-20c-h6m-do1-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 658.8,
    priceNGN: 658.8 * 1500,
    description: "2MP H6M Outdoor Mini-Dome with IR and 3.0mm Lens",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "2.0C-H6M-DO1-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 98,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "2MP H6M Outdoor Mini-Dome with IR and 3.0mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-103",
    sku: "3.0C-H6M-D1",
    name: "3MP H6M Indoor Mini Dome Camera with 2.9mm Lens",
    slug: "3mp-h6m-indoor-mini-dome-camera-with-29mm-lens-30c-h6m-d1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 598.8,
    priceNGN: 598.8 * 1500,
    description: "3.0 MP; H6 Mini Dome Camera; WDR; LightCatcher; Day/Night; 2.9mm f/2.0",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6%20Mini%20Dome/Surface%20Side%20White.2613-02072022.png"],
    specifications: [
      { label: "SKU", value: "3.0C-H6M-D1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 154,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "3MP H6M Indoor Mini Dome Camera with 2.9mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-104",
    sku: "3.0C-H6M-D1-IR",
    name: "3MP H6M Indoor Mini Dome IR Camera with 2.9mm Lens",
    slug: "3mp-h6m-indoor-mini-dome-ir-camera-with-29mm-lens-30c-h6m-d1-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 646.8,
    priceNGN: 646.8 * 1500,
    description: "3.0 MP; H6 Mini Dome Camera; WDR; LightCatcher; Day/Night; 2.9mm f/2.0; IR",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6%20Mini%20Dome/Surface%20Side%20White.2613-02072022.png"],
    specifications: [
      { label: "SKU", value: "3.0C-H6M-D1-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 89,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "3MP H6M Indoor Mini Dome IR Camera with 2.9mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-105",
    sku: "3.0C-H6M-D2-IR",
    name: "3MP H6M Indoor Mini Dome IR Camera with Wide Angle 2.4mm Lens",
    slug: "3mp-h6m-indoor-mini-dome-ir-camera-with-wide-angle-24mm-lens-30c-h6m-d2-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 694.8,
    priceNGN: 694.8 * 1500,
    description: "3.0 MP; H6 Mini Dome Camera; WDR; LightCatcher; Day/Night; 2.4mm f/2.1; IR",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6%20Mini%20Dome/Surface%20Side%20White.2613-02072022.png"],
    specifications: [
      { label: "SKU", value: "3.0C-H6M-D2-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 140,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "3MP H6M Indoor Mini Dome IR Camera with Wide Angle 2.4mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-106",
    sku: "5.0C-H5M-DO1-IR",
    name: "5MP H5M Dome Camera with 2.8mm lens",
    slug: "5mp-h5m-dome-camera-with-28mm-lens-50c-h5m-do1-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 827.42,
    priceNGN: 827.42 * 1500,
    description: "5.0 MP WDR; LightCatcher; Day/Night; Outdoor Dome; 2.8mm f/1.2; IR",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/Avigilon_H5M-Camera_Surface_Angle_070120.jpg"],
    specifications: [
      { label: "SKU", value: "5.0C-H5M-DO1-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 94,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "5MP H5M Dome Camera with 2.8mm lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-107",
    sku: "5.0C-H6M-D1-IR",
    name: "5MP H6M Indoor Mini Dome IR Camera with 2.9mm Lens",
    slug: "5mp-h6m-indoor-mini-dome-ir-camera-with-29mm-lens-50c-h6m-d1-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 790.81,
    priceNGN: 790.81 * 1500,
    description: "5.0 MP; H6 Mini Dome Camera; WDR; LightCatcher; Day/Night; 2.9mm f/2.0; IR",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6%20Mini%20Dome/Surface%20Side%20White.2613-02072022.png"],
    specifications: [
      { label: "SKU", value: "5.0C-H6M-D1-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 101,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "5MP H6M Indoor Mini Dome IR Camera with 2.9mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-108",
    sku: "5.0C-H6M-D2-IR",
    name: "5MP H6M Indoor Mini Dome IR Camera with Wide Angle 2.4mm Lens",
    slug: "5mp-h6m-indoor-mini-dome-ir-camera-with-wide-angle-24mm-lens-50c-h6m-d2-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 838.8,
    priceNGN: 838.8 * 1500,
    description: "5.0 MP; H6 Mini Dome Camera; WDR; LightCatcher; Day/Night; 2.4mm f/2.1; IR",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H6%20Mini%20Dome/Surface%20Side%20White.2613-02072022.png"],
    specifications: [
      { label: "SKU", value: "5.0C-H6M-D2-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 92,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "5MP H6M Indoor Mini Dome IR Camera with Wide Angle 2.4mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-109",
    sku: "5.0C-H6M-DO1-IR",
    name: "5MP H6M Outdoor Mini-Dome with IR and 3.0mm Lens",
    slug: "5mp-h6m-outdoor-mini-dome-with-ir-and-30mm-lens-50c-h6m-do1-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 958.8,
    priceNGN: 958.8 * 1500,
    description: "5MP H6M Outdoor Mini-Dome with IR and 3.0mm Lens",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "5.0C-H6M-DO1-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 77,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "5MP H6M Outdoor Mini-Dome with IR and 3.0mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-110",
    sku: "6.0C-H6A-DO1-BN1",
    name: "SMR 6.0C-H6A-DO1 Painted Brown 2-004850",
    slug: "smr-60c-h6a-do1-painted-brown-2-004850-60c-h6a-do1-bn1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 2026.81,
    priceNGN: 2026.81 * 1500,
    description: "SMR 6.0C-H6A-DO1 Painted Brown 2-004850",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "6.0C-H6A-DO1-BN1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 145,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "SMR 6.0C-H6A-DO1 Painted Brown 2-004850 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-111",
    sku: "H4IRPTZ-WARR-EXTEND-1YR",
    name: "H4 IR PTZ 1 Year Extended Warranty",
    slug: "h4-ir-ptz-1-year-extended-warranty-h4irptz-warr-extend-1yr",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 530.6,
    priceNGN: 530.6 * 1500,
    description: "Extended Warranty for H4 IR PTZ cameras; non-moving parts only; 1 year extension",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Warranty_070720.jpg"],
    specifications: [
      { label: "SKU", value: "H4IRPTZ-WARR-EXTEND-1YR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 142,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "H4 IR PTZ 1 Year Extended Warranty Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-112",
    sku: "H4IRPTZ-WARR-EXTEND-2YR",
    name: "H4 IR PTZ 2 Years Extended Warranty",
    slug: "h4-ir-ptz-2-years-extended-warranty-h4irptz-warr-extend-2yr",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 1059.73,
    priceNGN: 1059.73 * 1500,
    description: "Extended Warranty for H4 IR PTZ cameras; non-moving parts only; 2 years extension",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Warranty_070720.jpg"],
    specifications: [
      { label: "SKU", value: "H4IRPTZ-WARR-EXTEND-2YR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 146,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "H4 IR PTZ 2 Years Extended Warranty Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-113",
    sku: "H4PTZ-WARR-EXTEND-2YR",
    name: "H4 PTZ 2 Years Extended Warranty",
    slug: "h4-ptz-2-years-extended-warranty-h4ptz-warr-extend-2yr",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 749.24,
    priceNGN: 749.24 * 1500,
    description: "Extended Warranty for H4 PTZ cameras; non-moving parts only; 2 years extension",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Warranty_070720.jpg"],
    specifications: [
      { label: "SKU", value: "H4PTZ-WARR-EXTEND-2YR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 160,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "H4 PTZ 2 Years Extended Warranty Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-114",
    sku: "IRPTZ-MNT-NPTA1",
    name: "Pendant NPT adapter for H4 IRPTZ or H4 Multisensor",
    slug: "pendant-npt-adapter-for-h4-irptz-or-h4-multisensor-irptz-mnt-npta1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 81.77,
    priceNGN: 81.77 * 1500,
    description: "Pendant NPT adapter. For use with H4 IR PTZ or H4A-MH-AD-PEND1 on H4 Multisensor.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/Avigilon_H4-Multisensor-Camera_Pendant_Cap_Angle_070120.jpg"],
    specifications: [
      { label: "SKU", value: "IRPTZ-MNT-NPTA1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 86,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Pendant NPT adapter for H4 IRPTZ or H4 Multisensor Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-115",
    sku: "PTZ-CPNL-G",
    name: "Metal Ceiling Panel for In-Ceiling Installations; Grey",
    slug: "metal-ceiling-panel-for-in-ceiling-installations-grey-ptz-cpnl-g",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 100.8,
    priceNGN: 100.8 * 1500,
    description: "In-Ceiling Panel; PTZ Cameras; Grey",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "PTZ-CPNL-G" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 155,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Metal Ceiling Panel for In-Ceiling Installations; Grey Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-116",
    sku: "PTZH5A-CLER1",
    name: "H5A PTZ Replacement Clear Bubble Assembly",
    slug: "h5a-ptz-replacement-clear-bubble-assembly-ptzh5a-cler1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 174.92,
    priceNGN: 174.92 * 1500,
    description: "H5A PTZ Replacement Clear Bubble Assembly",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Video-Infrastructure-Devices-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "PTZH5A-CLER1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 158,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "H5A PTZ Replacement Clear Bubble Assembly Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-117",
    sku: "PTZH5A-SMOK1",
    name: "H5A PTZ Replacement Smoked Bubble Assembly",
    slug: "h5a-ptz-replacement-smoked-bubble-assembly-ptzh5a-smok1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 174.92,
    priceNGN: 174.92 * 1500,
    description: "H5A PTZ Replacement Smoked Bubble Assembly",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Video-Infrastructure-Devices-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "PTZH5A-SMOK1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 102,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "H5A PTZ Replacement Smoked Bubble Assembly Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-118",
    sku: "PTZH6A-CLRBBL",
    name: "Replacement clear dome",
    slug: "replacement-clear-dome-ptzh6a-clrbbl",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 100.8,
    priceNGN: 100.8 * 1500,
    description: "Replacement lower dome clear bubble for H6A-PTZ",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "PTZH6A-CLRBBL" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 168,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Replacement clear dome Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-119",
    sku: "PTZH6A-SMK50",
    name: "Replacement smoked dome; 50% tint",
    slug: "replacement-smoked-dome-50-tint-ptzh6a-smk50",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 100.8,
    priceNGN: 100.8 * 1500,
    description: "Smoked dome with 50% tint for H6A-PTZ.",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "PTZH6A-SMK50" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 107,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Replacement smoked dome; 50% tint Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-120",
    sku: "2.0C-H5A-IRPTZ-DP40-WP",
    name: "2.0C-H5A-IRPTZ-DP40-WP",
    slug: "20c-h5a-irptz-dp40-wp-20c-h5a-irptz-dp40-wp",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 5886.72,
    priceNGN: 5886.72 * 1500,
    description: "CAM; H5A IR PTZ; Pendant 2MP 40X 300m",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H5A%20IR%20PTZ/H5A%20IR%20PTZ%20Master_v03.Rendering%201-08162022.png"],
    specifications: [
      { label: "SKU", value: "2.0C-H5A-IRPTZ-DP40-WP" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 166,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "2.0C-H5A-IRPTZ-DP40-WP Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-121",
    sku: "4.0C-H5A-IRPTZ-DP36-WP",
    name: "4.0C-H5A-IRPTZ-DP36-WP",
    slug: "40c-h5a-irptz-dp36-wp-40c-h5a-irptz-dp36-wp",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 6603.66,
    priceNGN: 6603.66 * 1500,
    description: "CAM; H5A IR PTZ; Pendant 4MP 36X 150m",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H5A%20IR%20PTZ/H5A%20IR%20PTZ%20Master_v03.Rendering%201-08162022.png"],
    specifications: [
      { label: "SKU", value: "4.0C-H5A-IRPTZ-DP36-WP" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 100,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "4.0C-H5A-IRPTZ-DP36-WP Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-122",
    sku: "8.0C-H5A-IRPTZ-DP36-WP",
    name: "8.0C-H5A-IRPTZ-DP36-WP",
    slug: "80c-h5a-irptz-dp36-wp-80c-h5a-irptz-dp36-wp",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 7431.48,
    priceNGN: 7431.48 * 1500,
    description: "CAM; H5A IR PTZ; Pendant 8MP 36X 150m",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H5A%20IR%20PTZ/H5A%20IR%20PTZ%20Master_v03.Rendering%201-08162022.png"],
    specifications: [
      { label: "SKU", value: "8.0C-H5A-IRPTZ-DP36-WP" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 184,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "8.0C-H5A-IRPTZ-DP36-WP Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-123",
    sku: "8.0C-H5A-PTZ-DC36",
    name: "8.0C-H5A-PTZ-DC36",
    slug: "80c-h5a-ptz-dc36-80c-h5a-ptz-dc36",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 5783.4,
    priceNGN: 5783.4 * 1500,
    description: "H5A; 8MP 36x In-Ceiling PTZ Dome",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H5A-PTZ-In-Ceiling-Camera-%28Left-%C2%BE-View%2911052020.jpg"],
    specifications: [
      { label: "SKU", value: "8.0C-H5A-PTZ-DC36" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 123,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "8.0C-H5A-PTZ-DC36 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-124",
    sku: "8.0C-H5A-PTZ-DP36",
    name: "8.0C-H5A-PTZ-DP36",
    slug: "80c-h5a-ptz-dp36-80c-h5a-ptz-dp36",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 5783.4,
    priceNGN: 5783.4 * 1500,
    description: "H5A; 8MP 36x Pendant PTZ Dome",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H5A-PTZ-Camera-(Left-%C2%BE-View)11052020.jpg"],
    specifications: [
      { label: "SKU", value: "8.0C-H5A-PTZ-DP36" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 115,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "8.0C-H5A-PTZ-DP36 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-125",
    sku: "2.0C-H6A-PTZ-DC30-B",
    name: "H6A; 2MP 30X In-Ceiling PTZ Dome",
    slug: "h6a-2mp-30x-in-ceiling-ptz-dome-20c-h6a-ptz-dc30-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 4438.8,
    priceNGN: 4438.8 * 1500,
    description: "H6A; 2MP 30X In-Ceiling PTZ Dome",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png"],
    specifications: [
      { label: "SKU", value: "2.0C-H6A-PTZ-DC30-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 148,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "H6A; 2MP 30X In-Ceiling PTZ Dome Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-126",
    sku: "2.0C-H6A-PTZ-DP30-B",
    name: "H6A; 2MP 30X Pendant PTZ Dome",
    slug: "h6a-2mp-30x-pendant-ptz-dome-20c-h6a-ptz-dp30-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 4438.8,
    priceNGN: 4438.8 * 1500,
    description: "H6A PTZ; Pendant; 2MP; 30X",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png"],
    specifications: [
      { label: "SKU", value: "2.0C-H6A-PTZ-DP30-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 169,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "H6A; 2MP 30X Pendant PTZ Dome Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-127",
    sku: "4.0C-H6A-PTZ-DC30-B",
    name: "H6A; 4MP 30X In-Ceiling PTZ Dome",
    slug: "h6a-4mp-30x-in-ceiling-ptz-dome-40c-h6a-ptz-dc30-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 4798.8,
    priceNGN: 4798.8 * 1500,
    description: "H6A PTZ; 4MP 30X In-Ceiling PTZ Dome Camera",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png"],
    specifications: [
      { label: "SKU", value: "4.0C-H6A-PTZ-DC30-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 160,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "H6A; 4MP 30X In-Ceiling PTZ Dome Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-128",
    sku: "4.0C-H6A-PTZ-DP30-B",
    name: "H6A; 4MP 30X Pendant PTZ Dome",
    slug: "h6a-4mp-30x-pendant-ptz-dome-40c-h6a-ptz-dp30-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 4798.8,
    priceNGN: 4798.8 * 1500,
    description: "H6A; 4MP 30X Pendant PTZ Dome",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Alta%20Video/Avigilon_Generic_500x500_1.png"],
    specifications: [
      { label: "SKU", value: "4.0C-H6A-PTZ-DP30-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 160,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "H6A; 4MP 30X Pendant PTZ Dome Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-129",
    sku: "H5A-FE-DD-CLER1",
    name: "Replacement Dome Bubble for H5A Fisheye Dome Camera",
    slug: "replacement-dome-bubble-for-h5a-fisheye-dome-camera-h5a-fe-dd-cler1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 55.73,
    priceNGN: 55.73 * 1500,
    description: "Package of 3 replacement dome bubble for H5A Fisheye Dome Camera.",
    images: ["https://i.ibb.co/jv2qL4KQ/images-22.jpg"],
    specifications: [
      { label: "SKU", value: "H5A-FE-DD-CLER1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 94,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Replacement Dome Bubble for H5A Fisheye Dome Camera Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-130",
    sku: "H5A-FE-MT-NPTA1",
    name: "NPT Adapter For H5A Fisheye Dome Camera",
    slug: "npt-adapter-for-h5a-fisheye-dome-camera-h5a-fe-mt-npta1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 89.21,
    priceNGN: 89.21 * 1500,
    description: "NPT Adapter For H5A Fisheye Dome Camera (H5A-FE-DO)",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H5A-FE%20Pendant%20Adapter-500x500%20v2.jpg"],
    specifications: [
      { label: "SKU", value: "H5A-FE-MT-NPTA1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 157,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NPT Adapter For H5A Fisheye Dome Camera Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-131",
    sku: "H5AMH-DC-COVR1",
    name: "Dome bubble and cover; for in-ceiling mount; clear",
    slug: "dome-bubble-and-cover-for-in-ceiling-mount-clear-h5amh-dc-covr1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 110.86,
    priceNGN: 110.86 * 1500,
    description: "Dome bubble and cover; for in-ceiling mount; clear. For use with the Avigilon H5A Multisensor",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "H5AMH-DC-COVR1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 117,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Dome bubble and cover; for in-ceiling mount; clear Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-132",
    sku: "H5AMH-DC-COVR1-SMOKE",
    name: "Dome bubble and cover; for in-ceiling mount; smoked",
    slug: "dome-bubble-and-cover-for-in-ceiling-mount-smoked-h5amh-dc-covr1-smoke",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 110.86,
    priceNGN: 110.86 * 1500,
    description: "Dome bubble and cover; for in-ceiling mount; smoked. For use with the Avigilon H5A Multisensor",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "H5AMH-DC-COVR1-SMOKE" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 118,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Dome bubble and cover; for in-ceiling mount; smoked Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-133",
    sku: "H5AMH-DO-COVR1",
    name: "Dome bubble and cover; for outdoor surface mount or pendant mount; clear",
    slug: "dome-bubble-and-cover-for-outdoor-surface-mount-or-pendant-mount-clear-h5amh-do-covr1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 251.09,
    priceNGN: 251.09 * 1500,
    description: "Dome bubble and cover; for outdoor surface mount or pendant mount; clear. For use with the Avigilon H5A Multisensor",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "H5AMH-DO-COVR1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 170,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Dome bubble and cover; for outdoor surface mount or pendant mount; clear Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-134",
    sku: "H5AMH-DO-COVR1-SMOKE",
    name: "Dome bubble and cover; for outdoor surface mount or pendant mount; smoked",
    slug: "dome-bubble-and-cover-for-outdoor-surface-mount-or-pendant-mount-smoked-h5amh-do-covr1-smoke",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 251.09,
    priceNGN: 251.09 * 1500,
    description: "Dome bubble and cover; for outdoor surface mount or pendant mount; smoked. For use with the Avigilon H5A Multisensor",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "H5AMH-DO-COVR1-SMOKE" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 79,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Dome bubble and cover; for outdoor surface mount or pendant mount; smoked Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-135",
    sku: "H5DH-DO-CLER1",
    name: "Replacement Indoor/Outdoor Dome Cover for H5A Dual Head Camera",
    slug: "replacement-indooroutdoor-dome-cover-for-h5a-dual-head-camera-h5dh-do-cler1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 118.19,
    priceNGN: 118.19 * 1500,
    description: "Replacement Indoor/Outdoor Dome Cover for H5A Dual Head Camera",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/ACM/H5%20Dual%20Head/H5-Dual-Head-Bottom-Shell-03232021.jpg"],
    specifications: [
      { label: "SKU", value: "H5DH-DO-CLER1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 72,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Replacement Indoor/Outdoor Dome Cover for H5A Dual Head Camera Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-136",
    sku: "PTZMH-DC-CLER1",
    name: "Clear In-Ceiling Dome Cover for H4 PTZ",
    slug: "clear-in-ceiling-dome-cover-for-h4-ptz-ptzmh-dc-cler1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 178.43,
    priceNGN: 178.43 * 1500,
    description: "In-ceiling replacement clear transparent cover; includes dome bubble and camera cover for H4 PTZ and HD Multisensor (H3-xMH) pendant cameras.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "PTZMH-DC-CLER1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 159,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Clear In-Ceiling Dome Cover for H4 PTZ Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-137",
    sku: "PTZMH-DP-SMOK1",
    name: "Smoke Pendant Dome Cover for H4 PTZ",
    slug: "smoke-pendant-dome-cover-for-h4-ptz-ptzmh-dp-smok1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 178.43,
    priceNGN: 178.43 * 1500,
    description: "IK10 replacement smoked transparent cover; includes dome bubble and camera cover for H4 PTZ and HD Multisensor (H3-xMH) pendant cameras. Reduces light transmission by 50% compared to the standard clear cover. Not recommended for low light applications.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "PTZMH-DP-SMOK1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 85,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Smoke Pendant Dome Cover for H4 PTZ Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-138",
    sku: "H4VI-RO-CVER1",
    name: "Replacement dome cover for H4VI camera; package of 5",
    slug: "replacement-dome-cover-for-h4vi-camera-package-of-5-h4vi-ro-cver1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 59.47,
    priceNGN: 59.47 * 1500,
    description: "Replacement dome cover for H4VI camera; package of 5",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "H4VI-RO-CVER1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 97,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Replacement dome cover for H4VI camera; package of 5 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-139",
    sku: "2.0C-H6A-DO1-IR-B",
    name: "2MP H6A Outdoor IR Dome Camera with 2.8-12mm Lens",
    slug: "2mp-h6a-outdoor-ir-dome-camera-with-28-12mm-lens-20c-h6a-do1-ir-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 1570.79,
    priceNGN: 1570.79 * 1500,
    description: "2MP H6A Outdoor IR Dome Camera with 2.8-12mm Lens",
    images: ["https://i.ibb.co/TMJ9L0pR/images-18.jpg"],
    specifications: [
      { label: "SKU", value: "2.0C-H6A-DO1-IR-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 166,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "2MP H6A Outdoor IR Dome Camera with 2.8-12mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-140",
    sku: "2.0C-H6A-DO2-B",
    name: "2MP H6A Outdoor Dome Camera with 10.9-29mm Lens",
    slug: "2mp-h6a-outdoor-dome-camera-with-109-29mm-lens-20c-h6a-do2-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 1570.8,
    priceNGN: 1570.8 * 1500,
    description: "2MP H6A Outdoor Dome Camera with 10.9-29mm Lens",
    images: ["https://i.ibb.co/4Rwb4Xnw/download.webp"],
    specifications: [
      { label: "SKU", value: "2.0C-H6A-DO2-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 100,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "2MP H6A Outdoor Dome Camera with 10.9-29mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-141",
    sku: "2.0C-H6A-DO2-IR-B",
    name: "2MP H6A Outdoor IR Dome Camera with 10.9-29mm Lens",
    slug: "2mp-h6a-outdoor-ir-dome-camera-with-109-29mm-lens-20c-h6a-do2-ir-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 1642.8,
    priceNGN: 1642.8 * 1500,
    description: "2MP H6A Outdoor IR Dome Camera with 10.9-29mm Lens",
    images: ["https://i.ibb.co/jv2qL4KQ/images-22.jpg"],
    specifications: [
      { label: "SKU", value: "2.0C-H6A-DO2-IR-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 184,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "2MP H6A Outdoor IR Dome Camera with 10.9-29mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-142",
    sku: "4.0C-H6A-D1-B",
    name: "4MP H6A Indoor Dome Camera with 4.4-9.3mm Lens",
    slug: "4mp-h6a-indoor-dome-camera-with-44-93mm-lens-40c-h6a-d1-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 1558.8,
    priceNGN: 1558.8 * 1500,
    description: "4MP H6A Indoor Dome Camera with 4.4-9.3mm Lens",
    images: ["https://i.ibb.co/nM0SFS5g/images-21.jpg"],
    specifications: [
      { label: "SKU", value: "4.0C-H6A-D1-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 123,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "4MP H6A Indoor Dome Camera with 4.4-9.3mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-143",
    sku: "4.0C-H6A-D2-IR-B",
    name: "4MP H6A Indoor IR Dome Camera with 10.9-29mm Lens",
    slug: "4mp-h6a-indoor-ir-dome-camera-with-109-29mm-lens-40c-h6a-d2-ir-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 1702.8,
    priceNGN: 1702.8 * 1500,
    description: "4MP H6A Indoor IR Dome Camera with 10.9-29mm Lens",
    images: ["https://i.ibb.co/TMJ9L0pR/images-18.jpg"],
    specifications: [
      { label: "SKU", value: "4.0C-H6A-D2-IR-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 115,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "4MP H6A Indoor IR Dome Camera with 10.9-29mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-144",
    sku: "4.0C-H6A-DO1-B",
    name: "4MP H6A Outdoor Dome Camera with 4.4-9.3mm Lens",
    slug: "4mp-h6a-outdoor-dome-camera-with-44-93mm-lens-40c-h6a-do1-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 1798.8,
    priceNGN: 1798.8 * 1500,
    description: "4MP H6A Outdoor Dome Camera with 4.4-9.3mm Lens",
    images: ["https://i.ibb.co/4Rwb4Xnw/download.webp"],
    specifications: [
      { label: "SKU", value: "4.0C-H6A-DO1-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 148,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "4MP H6A Outdoor Dome Camera with 4.4-9.3mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-145",
    sku: "4.0C-H6A-DO2-IR-B",
    name: "4MP H6A Outdoor IR Dome Camera with 10.9-29mm Lens",
    slug: "4mp-h6a-outdoor-ir-dome-camera-with-109-29mm-lens-40c-h6a-do2-ir-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 1942.81,
    priceNGN: 1942.81 * 1500,
    description: "4MP H6A Outdoor IR Dome Camera with 10.9-29mm Lens",
    images: ["https://i.ibb.co/jv2qL4KQ/images-22.jpg"],
    specifications: [
      { label: "SKU", value: "4.0C-H6A-DO2-IR-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 169,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "4MP H6A Outdoor IR Dome Camera with 10.9-29mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-146",
    sku: "4.0C-H6XP-DO2-IR-NA-B",
    name: "4.0C-H6XP-DO2-IR-NA",
    slug: "40c-h6xp-do2-ir-na-40c-h6xp-do2-ir-na-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 2303.28,
    priceNGN: 2303.28 * 1500,
    description: "4MP H6XP Outdoor IR Dome Camera with 10.9-29mm Lens & Z-Wave Hub (908.4 MHz)",
    images: ["https://i.ibb.co/nM0SFS5g/images-21.jpg"],
    specifications: [
      { label: "SKU", value: "4.0C-H6XP-DO2-IR-NA-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 160,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "4.0C-H6XP-DO2-IR-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-147",
    sku: "6.0C-H6A-D2-IR-B",
    name: "6MP H6A Indoor IR Dome Camera with 10.9-29mm Lens",
    slug: "6mp-h6a-indoor-ir-dome-camera-with-109-29mm-lens-60c-h6a-d2-ir-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 1870.8,
    priceNGN: 1870.8 * 1500,
    description: "6MP H6A Indoor IR Dome Camera with 10.9-29mm Lens",
    images: ["https://i.ibb.co/TMJ9L0pR/images-18.jpg"],
    specifications: [
      { label: "SKU", value: "6.0C-H6A-D2-IR-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 160,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "6MP H6A Indoor IR Dome Camera with 10.9-29mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-148",
    sku: "6.0C-H6A-DO1-B-BN1",
    name: "SMR 6.0C-H6A-DO1-B Painted QT Brown 2-004850",
    slug: "smr-60c-h6a-do1-b-painted-qt-brown-2-004850-60c-h6a-do1-b-bn1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 2026.81,
    priceNGN: 2026.81 * 1500,
    description: "SMR 6.0C-H6A-DO1-B Painted Brown 2-004850",
    images: ["https://i.ibb.co/4Rwb4Xnw/download.webp"],
    specifications: [
      { label: "SKU", value: "6.0C-H6A-DO1-B-BN1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 166,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "SMR 6.0C-H6A-DO1-B Painted QT Brown 2-004850 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-149",
    sku: "6.0C-H6A-DO2-B",
    name: "6MP H6A Outdoor Dome Camera with 10.9-29mm Lens",
    slug: "6mp-h6a-outdoor-dome-camera-with-109-29mm-lens-60c-h6a-do2-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 2038.8,
    priceNGN: 2038.8 * 1500,
    description: "6MP H6A Outdoor Dome Camera with 10.9-29mm Lens",
    images: ["https://i.ibb.co/jv2qL4KQ/images-22.jpg"],
    specifications: [
      { label: "SKU", value: "6.0C-H6A-DO2-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 100,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "6MP H6A Outdoor Dome Camera with 10.9-29mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-150",
    sku: "8.0C-H6A-D2-B",
    name: "8MP H6A Indoor Dome Camera with 10.9-29mm Lens",
    slug: "8mp-h6a-indoor-dome-camera-with-109-29mm-lens-80c-h6a-d2-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 2098.8,
    priceNGN: 2098.8 * 1500,
    description: "8MP H6A Indoor Dome Camera with 10.9-29mm Lens",
    images: ["https://i.ibb.co/nM0SFS5g/images-21.jpg"],
    specifications: [
      { label: "SKU", value: "8.0C-H6A-D2-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 184,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "8MP H6A Indoor Dome Camera with 10.9-29mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-151",
    sku: "8.0C-H6A-D2-IR-B",
    name: "8MP H6A Indoor IR Dome Camera with 10.9-29mm Lens",
    slug: "8mp-h6a-indoor-ir-dome-camera-with-109-29mm-lens-80c-h6a-d2-ir-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 2170.79,
    priceNGN: 2170.79 * 1500,
    description: "8MP H6A Indoor IR Dome Camera with 10.9-29mm Lens",
    images: ["https://i.ibb.co/TMJ9L0pR/images-18.jpg"],
    specifications: [
      { label: "SKU", value: "8.0C-H6A-D2-IR-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 123,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "8MP H6A Indoor IR Dome Camera with 10.9-29mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-152",
    sku: "8.0C-H6X-DO2-IR-B",
    name: "8MP H6X Outdoor IR Dome Camera with 10.9-29mm Lens",
    slug: "8mp-h6x-outdoor-ir-dome-camera-with-109-29mm-lens-80c-h6x-do2-ir-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 2691.4,
    priceNGN: 2691.4 * 1500,
    description: "8MP H6X Outdoor IR Dome Camera with 10.9-29mm Lens",
    images: ["https://i.ibb.co/4Rwb4Xnw/download.webp"],
    specifications: [
      { label: "SKU", value: "8.0C-H6X-DO2-IR-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 115,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "8MP H6X Outdoor IR Dome Camera with 10.9-29mm Lens Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-153",
    sku: "8.0C-H6XP-DO1-IR-NA-B",
    name: "8.0C-H6XP-DO1-IR-NA",
    slug: "80c-h6xp-do1-ir-na-80c-h6xp-do1-ir-na-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 2792.16,
    priceNGN: 2792.16 * 1500,
    description: "8MP H6XP Outdoor IR Dome Camera with 4.4-9.3mm Lens & Z-Wave Hub (908.4 MHz)",
    images: ["https://i.ibb.co/jv2qL4KQ/images-22.jpg"],
    specifications: [
      { label: "SKU", value: "8.0C-H6XP-DO1-IR-NA-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 148,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "8.0C-H6XP-DO1-IR-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-dome-154",
    sku: "8.0C-H6XP-DO2-IR-NA-B",
    name: "8.0C-H6XP-DO2-IR-NA",
    slug: "80c-h6xp-do2-ir-na-80c-h6xp-do2-ir-na-b",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Dome Camera",
    priceUSD: 2861.46,
    priceNGN: 2861.46 * 1500,
    description: "8MP H6XP Outdoor IR Dome Camera with 10.9-29mm Lens & Z-Wave Hub (908.4 MHz)",
    images: ["https://i.ibb.co/nM0SFS5g/images-21.jpg"],
    specifications: [
      { label: "SKU", value: "8.0C-H6XP-DO2-IR-NA-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Dome Camera" }
    ],
    stock: 169,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "8.0C-H6XP-DO2-IR-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  }
];


export const ELECTRICAL_WORKSTATION_PRODUCTS: Product[] = [
  {
    id: "sp-wkstn-1",
    sku: "RM7X-WKS-4MN-AU",
    name: "Remote Monitoring Workstation; 4 Monitors; AU; Form H",
    slug: "remote-monitoring-workstation-4-monitors-au-form-h-rm7x-wks-4mn-au",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Electrical Workstation",
    priceUSD: 5266.8,
    priceNGN: 5266.8 * 1500,
    description: "REMOTE MONITOR WRKSTN; AU; 4MN; FORM H",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "RM7X-WKS-4MN-AU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Electrical Workstation" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Remote Monitoring Workstation; 4 Monitors; AU; Form H Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-wkstn-2",
    sku: "RM7X-WKS-4MN-EU",
    name: "Remote Monitoring Workstation; 4 Monitors; EU; Form H",
    slug: "remote-monitoring-workstation-4-monitors-eu-form-h-rm7x-wks-4mn-eu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Electrical Workstation",
    priceUSD: 5266.8,
    priceNGN: 5266.8 * 1500,
    description: "REMOTE MONITOR WRKSTN; EU; 4MN; FORM H",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "RM7X-WKS-4MN-EU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Electrical Workstation" }
    ],
    stock: 47,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Remote Monitoring Workstation; 4 Monitors; EU; Form H Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-wkstn-3",
    sku: "RM7X-WKS-4MN-NA",
    name: "Remote Monitoring Workstation; 4 Monitors; NA; Form H",
    slug: "remote-monitoring-workstation-4-monitors-na-form-h-rm7x-wks-4mn-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Electrical Workstation",
    priceUSD: 5266.8,
    priceNGN: 5266.8 * 1500,
    description: "REMOTE MONITOR WRKSTN; NA; 4MN; FORM H",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "RM7X-WKS-4MN-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Electrical Workstation" }
    ],
    stock: 36,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Remote Monitoring Workstation; 4 Monitors; NA; Form H Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-wkstn-4",
    sku: "RM7X-WKS-4MN-UK",
    name: "Remote Monitoring Workstation; 4 Monitors; UK; Form H",
    slug: "remote-monitoring-workstation-4-monitors-uk-form-h-rm7x-wks-4mn-uk",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Electrical Workstation",
    priceUSD: 5266.8,
    priceNGN: 5266.8 * 1500,
    description: "REMOTE MONITOR WRKSTN; UK; 4MN; FORM H",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "RM7X-WKS-4MN-UK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Electrical Workstation" }
    ],
    stock: 91,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Remote Monitoring Workstation; 4 Monitors; UK; Form H Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-wkstn-5",
    sku: "M4K32-G2-EU",
    name: "Monitor; 32\"; EU",
    slug: "monitor-32-eu-m4k32-g2-eu",
    brand: "Dell",
    category: "Electrical Systems",
    subcategory: "Electrical Workstation",
    priceUSD: 2275.12,
    priceNGN: 2275.12 * 1500,
    description: "Monitor; 32\" LCD 4K UHD; 16:9 Widescreen Aspect Ratio",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Dell-UltraSharp-32-4K-USB-C-Monitor-01062021.jpg"],
    specifications: [
      { label: "SKU", value: "M4K32-G2-EU" },
      { label: "Brand", value: "Dell" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Electrical Workstation" }
    ],
    stock: 73,
    oem: "Dell",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Monitor; 32\"; EU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-wkstn-6",
    sku: "M4K32-G3-AU",
    name: "Monitor; 32\"; AU' G3",
    slug: "monitor-32-au-g3-m4k32-g3-au",
    brand: "Dell",
    category: "Electrical Systems",
    subcategory: "Electrical Workstation",
    priceUSD: 1890,
    priceNGN: 1890 * 1500,
    description: "Monitor; 32\"; 4K UHD; 16:9 Aspect Ratio",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/Dell%20Monitor/DELL32IN-030422.jpg"],
    specifications: [
      { label: "SKU", value: "M4K32-G3-AU" },
      { label: "Brand", value: "Dell" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Electrical Workstation" }
    ],
    stock: 67,
    oem: "Dell",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Monitor; 32\"; AU' G3 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-wkstn-7",
    sku: "M4K32-G3-NA",
    name: "Monitor; 32\"; NA G3",
    slug: "monitor-32-na-g3-m4k32-g3-na",
    brand: "Dell",
    category: "Electrical Systems",
    subcategory: "Electrical Workstation",
    priceUSD: 1890,
    priceNGN: 1890 * 1500,
    description: "Monitor; 32\"; 4K UHD; 16:9 Aspect Ratio",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/Dell%20Monitor/DELL32IN-030422.jpg"],
    specifications: [
      { label: "SKU", value: "M4K32-G3-NA" },
      { label: "Brand", value: "Dell" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Electrical Workstation" }
    ],
    stock: 46,
    oem: "Dell",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Monitor; 32\"; NA G3 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-wkstn-8",
    sku: "M4K32-G3-UK",
    name: "Monitor; 32\"; UK G3",
    slug: "monitor-32-uk-g3-m4k32-g3-uk",
    brand: "Dell",
    category: "Electrical Systems",
    subcategory: "Electrical Workstation",
    priceUSD: 1890,
    priceNGN: 1890 * 1500,
    description: "Monitor; 32\"; 4K UHD; 16:9 Aspect Ratio",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/Dell%20Monitor/DELL32IN-030422.jpg"],
    specifications: [
      { label: "SKU", value: "M4K32-G3-UK" },
      { label: "Brand", value: "Dell" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Electrical Workstation" }
    ],
    stock: 84,
    oem: "Dell",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Monitor; 32\"; UK G3 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-wkstn-9",
    sku: "M4K43-G2-AU",
    name: "Monitor; 43\"; AU",
    slug: "monitor-43-au-m4k43-g2-au",
    brand: "Dell",
    category: "Electrical Systems",
    subcategory: "Electrical Workstation",
    priceUSD: 2134.44,
    priceNGN: 2134.44 * 1500,
    description: "Monitor; 43\" LCD 4K UHD; 16:9 Widescreen Aspect Ratio",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/106329604-1578616761138u4320q_leftfacing1_072920.jpg"],
    specifications: [
      { label: "SKU", value: "M4K43-G2-AU" },
      { label: "Brand", value: "Dell" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Electrical Workstation" }
    ],
    stock: 93,
    oem: "Dell",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Monitor; 43\"; AU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-wkstn-10",
    sku: "M4K43-G2-EU",
    name: "Monitor; 43\"; EU",
    slug: "monitor-43-eu-m4k43-g2-eu",
    brand: "Dell",
    category: "Electrical Systems",
    subcategory: "Electrical Workstation",
    priceUSD: 2134.44,
    priceNGN: 2134.44 * 1500,
    description: "Monitor; 43\" LCD 4K UHD; 16:9 Widescreen Aspect Ratio",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/106329604-1578616761138u4320q_leftfacing1_072920.jpg"],
    specifications: [
      { label: "SKU", value: "M4K43-G2-EU" },
      { label: "Brand", value: "Dell" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Electrical Workstation" }
    ],
    stock: 96,
    oem: "Dell",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Monitor; 43\"; EU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-wkstn-11",
    sku: "M4K43-G2-NA",
    name: "Monitor; 43\"; NA",
    slug: "monitor-43-na-m4k43-g2-na",
    brand: "Dell",
    category: "Electrical Systems",
    subcategory: "Electrical Workstation",
    priceUSD: 2134.44,
    priceNGN: 2134.44 * 1500,
    description: "Monitor; 43\" LCD 4K UHD; 16:9 Widescreen Aspect Ratio",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/106329604-1578616761138u4320q_leftfacing1_072920.jpg"],
    specifications: [
      { label: "SKU", value: "M4K43-G2-NA" },
      { label: "Brand", value: "Dell" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Electrical Workstation" }
    ],
    stock: 65,
    oem: "Dell",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Monitor; 43\"; NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-wkstn-12",
    sku: "M4K43-G2-UK",
    name: "Monitor; 43\"; UK",
    slug: "monitor-43-uk-m4k43-g2-uk",
    brand: "Dell",
    category: "Electrical Systems",
    subcategory: "Electrical Workstation",
    priceUSD: 2134.44,
    priceNGN: 2134.44 * 1500,
    description: "Monitor; 43\" LCD 4K UHD; 16:9 Widescreen Aspect Ratio",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/106329604-1578616761138u4320q_leftfacing1_072920.jpg"],
    specifications: [
      { label: "SKU", value: "M4K43-G2-UK" },
      { label: "Brand", value: "Dell" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Electrical Workstation" }
    ],
    stock: 47,
    oem: "Dell",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Monitor; 43\"; UK Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-wkstn-13",
    sku: "MHD19-G3-NA",
    name: "Monitor; 19\"; NA G3",
    slug: "monitor-19-na-g3-mhd19-g3-na",
    brand: "Dell",
    category: "Electrical Systems",
    subcategory: "Electrical Workstation",
    priceUSD: 693,
    priceNGN: 693 * 1500,
    description: "Monitor; 19\"; HD; SXGA",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/Dell%20Monitor/DELL19IN-030422.jpg"],
    specifications: [
      { label: "SKU", value: "MHD19-G3-NA" },
      { label: "Brand", value: "Dell" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Electrical Workstation" }
    ],
    stock: 57,
    oem: "Dell",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Monitor; 19\"; NA G3 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-wkstn-14",
    sku: "MHD24-G3-AU",
    name: "Monitor; 24\"; AU' G3",
    slug: "monitor-24-au-g3-mhd24-g3-au",
    brand: "Dell",
    category: "Electrical Systems",
    subcategory: "Electrical Workstation",
    priceUSD: 868.14,
    priceNGN: 868.14 * 1500,
    description: "Monitor; 24\"; HD; 16:9 Aspect Ratio",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/Dell%20Monitor/DELL24IN-030422.jpg"],
    specifications: [
      { label: "SKU", value: "MHD24-G3-AU" },
      { label: "Brand", value: "Dell" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Electrical Workstation" }
    ],
    stock: 84,
    oem: "Dell",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Monitor; 24\"; AU' G3 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-wkstn-15",
    sku: "MHD24-G3-EU",
    name: "Monitor; 24\"; EU G3",
    slug: "monitor-24-eu-g3-mhd24-g3-eu",
    brand: "Dell",
    category: "Electrical Systems",
    subcategory: "Electrical Workstation",
    priceUSD: 868.14,
    priceNGN: 868.14 * 1500,
    description: "Monitor; 24\"; HD; 16:9 Aspect Ratio",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/Dell%20Monitor/DELL24IN-030422.jpg"],
    specifications: [
      { label: "SKU", value: "MHD24-G3-EU" },
      { label: "Brand", value: "Dell" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Electrical Workstation" }
    ],
    stock: 73,
    oem: "Dell",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Monitor; 24\"; EU G3 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-wkstn-16",
    sku: "MHD24-G3-NA",
    name: "Monitor; 24\"; NA G3",
    slug: "monitor-24-na-g3-mhd24-g3-na",
    brand: "Dell",
    category: "Electrical Systems",
    subcategory: "Electrical Workstation",
    priceUSD: 868.14,
    priceNGN: 868.14 * 1500,
    description: "Monitor; 24\"; HD; 16:9 Aspect Ratio",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/Dell%20Monitor/DELL24IN-030422.jpg"],
    specifications: [
      { label: "SKU", value: "MHD24-G3-NA" },
      { label: "Brand", value: "Dell" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Electrical Workstation" }
    ],
    stock: 67,
    oem: "Dell",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Monitor; 24\"; NA G3 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-wkstn-17",
    sku: "MHD24-G3-UK",
    name: "Monitor; 24\"; UK G3",
    slug: "monitor-24-uk-g3-mhd24-g3-uk",
    brand: "Dell",
    category: "Electrical Systems",
    subcategory: "Electrical Workstation",
    priceUSD: 868.14,
    priceNGN: 868.14 * 1500,
    description: "Monitor; 24\"; HD; 16:9 Aspect Ratio",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/Dell%20Monitor/DELL24IN-030422.jpg"],
    specifications: [
      { label: "SKU", value: "MHD24-G3-UK" },
      { label: "Brand", value: "Dell" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Electrical Workstation" }
    ],
    stock: 46,
    oem: "Dell",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Monitor; 24\"; UK G3 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-wkstn-18",
    sku: "NVR4-WKS-WARR-EXTEND-2YR",
    name: "2YR Warranty Extension; NVR4-WKS or RM5-WKS",
    slug: "2yr-warranty-extension-nvr4-wks-or-rm5-wks-nvr4-wks-warr-extend-2yr",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Electrical Workstation",
    priceUSD: 561.2,
    priceNGN: 561.2 * 1500,
    description: "2 Year Warranty Extension for NVR4-WKS or RM5-WKS",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Warranty_070720.jpg"],
    specifications: [
      { label: "SKU", value: "NVR4-WKS-WARR-EXTEND-2YR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Electrical Workstation" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "2YR Warranty Extension; NVR4-WKS or RM5-WKS Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-wkstn-19",
    sku: "RM5-WKS-WARR-EXTENED-2YR",
    name: "2 Year Extended Warranty for RM5-WKS",
    slug: "2-year-extended-warranty-for-rm5-wks-rm5-wks-warr-extened-2yr",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Electrical Workstation",
    priceUSD: 561.2,
    priceNGN: 561.2 * 1500,
    description: "2 Year Extended Warranty for RM5-WKS",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Warranty_070720.jpg"],
    specifications: [
      { label: "SKU", value: "RM5-WKS-WARR-EXTENED-2YR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Electrical Workstation" }
    ],
    stock: 93,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "2 Year Extended Warranty for RM5-WKS Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-wkstn-20",
    sku: "NVR6-PRM-FORM-D-200TB-S22-EU",
    name: "NVR6-PRM-FORM-D-200TB-S22-EU",
    slug: "nvr6-prm-form-d-200tb-s22-eu-nvr6-prm-form-d-200tb-s22-eu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Electrical Workstation",
    priceUSD: 125244,
    priceNGN: 125244 * 1500,
    description: "NVR6 PRM FORM D 200 TB 2U Rack Mnt; WS22; 5Y Onsite 4HMC; EU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-PRM-FORM-D-200TB-S22-EU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Electrical Workstation" }
    ],
    stock: 96,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-PRM-FORM-D-200TB-S22-EU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-wkstn-21",
    sku: "NVR6-STD-FORM-D-64TB-S22-NA",
    name: "NVR6-STD-FORM-D-64TB-S22-NA",
    slug: "nvr6-std-form-d-64tb-s22-na-nvr6-std-form-d-64tb-s22-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Electrical Workstation",
    priceUSD: 59598,
    priceNGN: 59598 * 1500,
    description: "NVR6 STD FORM D 64TB 2U Rack Mnt; WS22; 5Y Onsite NBD; NA",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FORM-D-64TB-S22-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Electrical Workstation" }
    ],
    stock: 65,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FORM-D-64TB-S22-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-wkstn-22",
    sku: "RM7X-WKS-2MN-AU",
    name: "Remote Monitoring Workstation; 2 Monitors; AU; Form H",
    slug: "remote-monitoring-workstation-2-monitors-au-form-h-rm7x-wks-2mn-au",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Electrical Workstation",
    priceUSD: 3263.4,
    priceNGN: 3263.4 * 1500,
    description: "REMOTE MONITOR WRKSTN; AU; 2MN; FORM H",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "RM7X-WKS-2MN-AU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Electrical Workstation" }
    ],
    stock: 47,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Remote Monitoring Workstation; 2 Monitors; AU; Form H Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-wkstn-23",
    sku: "RM7X-WKS-2MN-EU",
    name: "Remote Monitoring Workstation; 2 Monitors; EU; Form H",
    slug: "remote-monitoring-workstation-2-monitors-eu-form-h-rm7x-wks-2mn-eu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Electrical Workstation",
    priceUSD: 3263.4,
    priceNGN: 3263.4 * 1500,
    description: "REMOTE MONITOR WRKSTN; EU; 2MN; FORM H",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "RM7X-WKS-2MN-EU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Electrical Workstation" }
    ],
    stock: 57,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Remote Monitoring Workstation; 2 Monitors; EU; Form H Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-wkstn-24",
    sku: "RM7X-WKS-2MN-NA",
    name: "Remote Monitoring Workstation; 2 Monitors; NA; Form H",
    slug: "remote-monitoring-workstation-2-monitors-na-form-h-rm7x-wks-2mn-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Electrical Workstation",
    priceUSD: 3263.4,
    priceNGN: 3263.4 * 1500,
    description: "REMOTE MONITOR WRKSTN; NA; 2MN; FORM H",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "RM7X-WKS-2MN-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Electrical Workstation" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Remote Monitoring Workstation; 2 Monitors; NA; Form H Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-wkstn-25",
    sku: "RM7X-WKS-2MN-UK",
    name: "Remote Monitoring Workstation; 2 Monitors; UK; Form H",
    slug: "remote-monitoring-workstation-2-monitors-uk-form-h-rm7x-wks-2mn-uk",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Electrical Workstation",
    priceUSD: 3263.4,
    priceNGN: 3263.4 * 1500,
    description: "REMOTE MONITOR WRKSTN; UK; 2MN; FORM H",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "RM7X-WKS-2MN-UK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Electrical Workstation" }
    ],
    stock: 73,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Remote Monitoring Workstation; 2 Monitors; UK; Form H Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  }
];

export const NETWORK_VIDEO_RECORDER_PRODUCTS: Product[] = [
  {
    id: "sp-nvr-1",
    sku: "AINVR2X-PRM-FORM-D-200TB-AU",
    name: "AINVR2X-PRM-FORM-D-200TB-AU",
    slug: "ainvr2x-prm-form-d-200tb-au-ainvr2x-prm-form-d-200tb-au",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 125244,
    priceNGN: 125244 * 1500,
    description: "AI NVR 2X PRM FORM D 200 TB 2U Rack Mnt; HardenedOS; 5Y Onsite 4HMC; NA",
    images: ["https://i.ibb.co/wNV807sS/images-46.jpg"],
    specifications: [
      { label: "SKU", value: "AINVR2X-PRM-FORM-D-200TB-AU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 73,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2X-PRM-FORM-D-200TB-AU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-2",
    sku: "AINVR2X-PRM-FORM-D-200TB-NA",
    name: "AINVR2X-PRM-FORM-D-200TB-NA",
    slug: "ainvr2x-prm-form-d-200tb-na-ainvr2x-prm-form-d-200tb-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 125244,
    priceNGN: 125244 * 1500,
    description: "AI NVR 2X PRM FORM D 200 TB 2U Rack Mnt; HardenedOS; 5Y Onsite 4HMC; NA",
    images: ["https://i.ibb.co/zVzyyFNq/images-45.jpg"],
    specifications: [
      { label: "SKU", value: "AINVR2X-PRM-FORM-D-200TB-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 67,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2X-PRM-FORM-D-200TB-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-3",
    sku: "NVR5X-WKS-4TB-AU",
    name: "NVR5X-WKS-4TB-AU",
    slug: "nvr5x-wks-4tb-au-nvr5x-wks-4tb-au",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 3817.8,
    priceNGN: 3817.8 * 1500,
    description: "NVR5X Workstation; 4TB; Windows 11; AU",
    images: ["https://i.ibb.co/d4HD0ccd/images-44.jpg"],
    specifications: [
      { label: "SKU", value: "NVR5X-WKS-4TB-AU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 46,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR5X-WKS-4TB-AU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-4",
    sku: "NVR5X-WKS-4TB-EU",
    name: "NVR5X-WKS-4TB-EU",
    slug: "nvr5x-wks-4tb-eu-nvr5x-wks-4tb-eu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 3817.8,
    priceNGN: 3817.8 * 1500,
    description: "NVR5X Workstation; 4TB; Windows 11; EU",
    images: ["https://i.ibb.co/ZpyMdpGF/images-43.jpg"],
    specifications: [
      { label: "SKU", value: "NVR5X-WKS-4TB-EU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR5X-WKS-4TB-EU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-5",
    sku: "NVR5X-WKS-4TB-NA",
    name: "NVR5X-WKS-4TB-NA",
    slug: "nvr5x-wks-4tb-na-nvr5x-wks-4tb-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 3817.8,
    priceNGN: 3817.8 * 1500,
    description: "NVR5X Workstation; 4TB; Windows 11; NA",
    images: ["https://i.ibb.co/wNV807sS/images-46.jpg"],
    specifications: [
      { label: "SKU", value: "NVR5X-WKS-4TB-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 93,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR5X-WKS-4TB-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-6",
    sku: "NVR5X-WKS-4TB-UK",
    name: "NVR5X-WKS-4TB-UK",
    slug: "nvr5x-wks-4tb-uk-nvr5x-wks-4tb-uk",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 3817.8,
    priceNGN: 3817.8 * 1500,
    description: "NVR5X Workstation; 4TB; Windows 11; UK",
    images: ["https://i.ibb.co/zVzyyFNq/images-45.jpg"],
    specifications: [
      { label: "SKU", value: "NVR5X-WKS-4TB-UK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 96,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR5X-WKS-4TB-UK Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-7",
    sku: "NVR5X-WKS-8TB-AU",
    name: "NVR5X-WKS-8TB-AU",
    slug: "nvr5x-wks-8tb-au-nvr5x-wks-8tb-au",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 4422.6,
    priceNGN: 4422.6 * 1500,
    description: "NVR5X Workstation; 8TB; Windows 11; AU",
    images: ["https://i.ibb.co/d4HD0ccd/images-44.jpg"],
    specifications: [
      { label: "SKU", value: "NVR5X-WKS-8TB-AU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 65,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR5X-WKS-8TB-AU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-8",
    sku: "NVR5X-WKS-8TB-EU",
    name: "NVR5X-WKS-8TB-EU",
    slug: "nvr5x-wks-8tb-eu-nvr5x-wks-8tb-eu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 4422.6,
    priceNGN: 4422.6 * 1500,
    description: "NVR5X Workstation; 8TB; Windows 11; EU",
    images: ["https://i.ibb.co/ZpyMdpGF/images-43.jpg"],
    specifications: [
      { label: "SKU", value: "NVR5X-WKS-8TB-EU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 47,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR5X-WKS-8TB-EU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-9",
    sku: "NVR5X-WKS-8TB-NA",
    name: "NVR5X-WKS-8TB-NA",
    slug: "nvr5x-wks-8tb-na-nvr5x-wks-8tb-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 4422.6,
    priceNGN: 4422.6 * 1500,
    description: "NVR5X Workstation; 8TB; Windows 11; NA",
    images: ["https://i.ibb.co/d4HD0ccd/images-44.jpg"],
    specifications: [
      { label: "SKU", value: "NVR5X-WKS-8TB-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 57,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR5X-WKS-8TB-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-10",
    sku: "NVR5X-WKS-8TB-UK",
    name: "NVR5X-WKS-8TB-UK",
    slug: "nvr5x-wks-8tb-uk-nvr5x-wks-8tb-uk",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 4422.6,
    priceNGN: 4422.6 * 1500,
    description: "NVR5X Workstation; 8TB; Windows 11; UK",
    images: ["https://i.ibb.co/ZpyMdpGF/images-43.jpg"],
    specifications: [
      { label: "SKU", value: "NVR5X-WKS-8TB-UK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR5X-WKS-8TB-UK Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-11",
    sku: "ENVR2-PLUS-8P4-AU",
    name: "ENVR2 PLUS 4 TB with Avigilon Control Center; AU Power Cord",
    slug: "envr2-plus-4-tb-with-avigilon-control-center-au-power-cord-envr2-plus-8p4-au",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 2923.2,
    priceNGN: 2923.2 * 1500,
    description: "ENVR2 PLUS 4 TB with Avigilon Control Center; AU Power Cord",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/ENVR2%20Plus_Front-171022.jpg"],
    specifications: [
      { label: "SKU", value: "ENVR2-PLUS-8P4-AU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 73,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "ENVR2 PLUS 4 TB with Avigilon Control Center; AU Power Cord Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-12",
    sku: "ENVR2-PLUS-8P4-EU",
    name: "ENVR2 PLUS 4 TB with Avigilon Control Center; EU Power Cord",
    slug: "envr2-plus-4-tb-with-avigilon-control-center-eu-power-cord-envr2-plus-8p4-eu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 2923.2,
    priceNGN: 2923.2 * 1500,
    description: "ENVR2 PLUS 4 TB with Avigilon Control Center; EU Power Cord",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/ENVR2%20Plus_Front-171022.jpg"],
    specifications: [
      { label: "SKU", value: "ENVR2-PLUS-8P4-EU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 67,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "ENVR2 PLUS 4 TB with Avigilon Control Center; EU Power Cord Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-13",
    sku: "ENVR2-PLUS-8P4-NA",
    name: "ENVR2 PLUS 4 TB with Avigilon Control Center; NA Power Cord",
    slug: "envr2-plus-4-tb-with-avigilon-control-center-na-power-cord-envr2-plus-8p4-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 2923.2,
    priceNGN: 2923.2 * 1500,
    description: "ENVR2 PLUS 4 TB with Avigilon Control Center; NA Power Cord",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/ENVR2%20Plus_Front-171022.jpg"],
    specifications: [
      { label: "SKU", value: "ENVR2-PLUS-8P4-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 46,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "ENVR2 PLUS 4 TB with Avigilon Control Center; NA Power Cord Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-14",
    sku: "ENVR2-PLUS-8P4-UK",
    name: "ENVR2 PLUS 4 TB with Avigilon Control Center; UK Power Cord",
    slug: "envr2-plus-4-tb-with-avigilon-control-center-uk-power-cord-envr2-plus-8p4-uk",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 2923.2,
    priceNGN: 2923.2 * 1500,
    description: "ENVR2 PLUS 4 TB with Avigilon Control Center; UK Power Cord",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/ENVR2%20Plus_Front-171022.jpg"],
    specifications: [
      { label: "SKU", value: "ENVR2-PLUS-8P4-UK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "ENVR2 PLUS 4 TB with Avigilon Control Center; UK Power Cord Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-15",
    sku: "ENVR2-PLUS-8P8-AU",
    name: "ENVR2 PLUS 8 TB with Avigilon Control Center; AU Power Cord",
    slug: "envr2-plus-8-tb-with-avigilon-control-center-au-power-cord-envr2-plus-8p8-au",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 3855.6,
    priceNGN: 3855.6 * 1500,
    description: "ENVR2 PLUS 8 TB with Avigilon Control Center; AU Power Cord",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/ENVR2%20Plus_Front-171022.jpg"],
    specifications: [
      { label: "SKU", value: "ENVR2-PLUS-8P8-AU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 93,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "ENVR2 PLUS 8 TB with Avigilon Control Center; AU Power Cord Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-16",
    sku: "ENVR2-PLUS-8P8-EU",
    name: "ENVR2 PLUS 8 TB with Avigilon Control Center; EU Power Cord",
    slug: "envr2-plus-8-tb-with-avigilon-control-center-eu-power-cord-envr2-plus-8p8-eu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 3855.6,
    priceNGN: 3855.6 * 1500,
    description: "ENVR2 PLUS 8 TB with Avigilon Control Center; EU Power Cord",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/ENVR2%20Plus_Front-171022.jpg"],
    specifications: [
      { label: "SKU", value: "ENVR2-PLUS-8P8-EU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 96,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "ENVR2 PLUS 8 TB with Avigilon Control Center; EU Power Cord Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-17",
    sku: "ENVR2-PLUS-8P8-NA",
    name: "ENVR2 PLUS 8 TB with Avigilon Control Center; NA Power Cord",
    slug: "envr2-plus-8-tb-with-avigilon-control-center-na-power-cord-envr2-plus-8p8-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 3855.6,
    priceNGN: 3855.6 * 1500,
    description: "ENVR2 PLUS 8 TB with Avigilon Control Center; NA Power Cord",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/ENVR2%20Plus_Front-171022.jpg"],
    specifications: [
      { label: "SKU", value: "ENVR2-PLUS-8P8-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 65,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "ENVR2 PLUS 8 TB with Avigilon Control Center; NA Power Cord Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-18",
    sku: "ENVR2-PLUS-8P8-UK",
    name: "ENVR2 PLUS 8 TB with Avigilon Control Center; UK Power Cord",
    slug: "envr2-plus-8-tb-with-avigilon-control-center-uk-power-cord-envr2-plus-8p8-uk",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 3855.6,
    priceNGN: 3855.6 * 1500,
    description: "ENVR2 PLUS 8 TB with Avigilon Control Center; UK Power Cord",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/ENVR2%20Plus_Front-171022.jpg"],
    specifications: [
      { label: "SKU", value: "ENVR2-PLUS-8P8-UK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 47,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "ENVR2 PLUS 8 TB with Avigilon Control Center; UK Power Cord Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-19",
    sku: "ENVR2X-RGD-STREETLIGHT-MOUNT-4TB-NO-SIM",
    name: "ENVR2X-RGD-STREETLIGHT-MOUNT-4TB-NO-SIM",
    slug: "envr2x-rgd-streetlight-mount-4tb-no-sim-envr2x-rgd-streetlight-mount-4tb-no-sim",
    brand: "Motorola Solutions",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 13167,
    priceNGN: 13167 * 1500,
    description: "The Motorola Solutions ENVR2X is a multifunctional; streetlight-mounted appliance designed for effortless city infrastructure upgrades.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/ENVR2%20Plus_Front-171022.jpg"],
    specifications: [
      { label: "SKU", value: "ENVR2X-RGD-STREETLIGHT-MOUNT-4TB-NO-SIM" },
      { label: "Brand", value: "Motorola Solutions" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 57,
    oem: "Motorola Solutions",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "ENVR2X-RGD-STREETLIGHT-MOUNT-4TB-NO-SIM Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-20",
    sku: "ENVR2-PLUS-8P-WARR-EXTEND-2YR",
    name: "ENVR2-PLUS-8P-WARR-EXTEND-2YR",
    slug: "envr2-plus-8p-warr-extend-2yr-envr2-plus-8p-warr-extend-2yr",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 583.07,
    priceNGN: 583.07 * 1500,
    description: "WARRANTY - ENVR2+-8P Extend 2Yr",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Warranty_070720.jpg"],
    specifications: [
      { label: "SKU", value: "ENVR2-PLUS-8P-WARR-EXTEND-2YR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "ENVR2-PLUS-8P-WARR-EXTEND-2YR Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-21",
    sku: "ENVR2X-RGD-DPY-PC-NA",
    name: "ENVR2X-RGD-DPY-PC-NA",
    slug: "envr2x-rgd-dpy-pc-na-envr2x-rgd-dpy-pc-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 240,
    priceNGN: 240 * 1500,
    description: "Power cord for pre-deployment",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "ENVR2X-RGD-DPY-PC-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 73,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "ENVR2X-RGD-DPY-PC-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-22",
    sku: "AINVR-KYD-WARR-5YR",
    name: "AI NVR Keep Your Drive Warranty; 5YR",
    slug: "ai-nvr-keep-your-drive-warranty-5yr-ainvr-kyd-warr-5yr",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 1457.66,
    priceNGN: 1457.66 * 1500,
    description: "5 Year Keep Your Drive Warranty; All AI NVR Models",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Warranty_070720.jpg"],
    specifications: [
      { label: "SKU", value: "AINVR-KYD-WARR-5YR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 67,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AI NVR Keep Your Drive Warranty; 5YR Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-23",
    sku: "AINVR-PRM-WARR-5Y4HMC",
    name: "4Hr Mission Critical Upgrade for AI NVR Premium",
    slug: "4hr-mission-critical-upgrade-for-ai-nvr-premium-ainvr-prm-warr-5y4hmc",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 5830.7,
    priceNGN: 5830.7 * 1500,
    description: "Upgrade the 5 year NBD warranty that comes with AI NVR Premium or AI NVR Premium+ to 5 year 4HMC",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Warranty_070720.jpg"],
    specifications: [
      { label: "SKU", value: "AINVR-PRM-WARR-5Y4HMC" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 46,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "4Hr Mission Critical Upgrade for AI NVR Premium Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-24",
    sku: "AINVR-PRM-WARR-EXTEND-3MO",
    name: "3 Month Warranty Extension for AINVR PRM/PRM+ (approved project only).",
    slug: "3-month-warranty-extension-for-ainvr-prmprm-approved-project-only-ainvr-prm-warr-extend-3mo",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 1200,
    priceNGN: 1200 * 1500,
    description: "3 Month Warranty Extension for AINVR PRM/PRM+ (approved project only).",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/ENVR2%20Plus_Front-171022.jpg"],
    specifications: [
      { label: "SKU", value: "AINVR-PRM-WARR-EXTEND-3MO" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "3 Month Warranty Extension for AINVR PRM/PRM+ (approved project only). Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-25",
    sku: "AINVR-PRM-WARR-EXTEND-6MO",
    name: "6 Month Warranty Extension for AINVR PRM/PRM+ (approved project only).",
    slug: "6-month-warranty-extension-for-ainvr-prmprm-approved-project-only-ainvr-prm-warr-extend-6mo",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 2400,
    priceNGN: 2400 * 1500,
    description: "3 Month Warranty Extension for AINVR PRM/PRM+ (approved project only).",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/ENVR2%20Plus_Front-171022.jpg"],
    specifications: [
      { label: "SKU", value: "AINVR-PRM-WARR-EXTEND-6MO" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 93,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "6 Month Warranty Extension for AINVR PRM/PRM+ (approved project only). Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-26",
    sku: "AINVR-STD-WARR-5Y4HMC",
    name: "4Hr Mission Critical Upgrade for AI NVR Standard",
    slug: "4hr-mission-critical-upgrade-for-ai-nvr-standard-ainvr-std-warr-5y4hmc",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 3644.18,
    priceNGN: 3644.18 * 1500,
    description: "Upgrade the 5 year NBD warranty that comes with AI NVR Standard to 5 year 4HMC",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Warranty_070720.jpg"],
    specifications: [
      { label: "SKU", value: "AINVR-STD-WARR-5Y4HMC" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 96,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "4Hr Mission Critical Upgrade for AI NVR Standard Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-27",
    sku: "AINVR-VAL-WARR-5Y4HMC",
    name: "4Hr Mission Critical Upgrade for AI NVR Value",
    slug: "4hr-mission-critical-upgrade-for-ai-nvr-value-ainvr-val-warr-5y4hmc",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 2040.74,
    priceNGN: 2040.74 * 1500,
    description: "Upgrade the 5 year NBD warranty that comes with AI NVR Value to 5 year 4HMC",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Warranty_070720.jpg"],
    specifications: [
      { label: "SKU", value: "AINVR-VAL-WARR-5Y4HMC" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 65,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "4Hr Mission Critical Upgrade for AI NVR Value Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-28",
    sku: "AINVR2-PRM-FORM-D-200TB-UK",
    name: "AINVR2-PRM-FORM-D-200TB-UK",
    slug: "ainvr2-prm-form-d-200tb-uk-ainvr2-prm-form-d-200tb-uk",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 104328,
    priceNGN: 104328 * 1500,
    description: "AI NVR 2 PRM FORM D 200 TB 2U Rack Mnt; HardenedOS; 5Y Onsite 4HMC; UK",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "AINVR2-PRM-FORM-D-200TB-UK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 47,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2-PRM-FORM-D-200TB-UK Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-29",
    sku: "AINVR2-PRM-PLUS-FORM-H-200TB-AU",
    name: "AINVR2-PRM-PLUS-FORM-H-200TB-AU",
    slug: "ainvr2-prm-plus-form-h-200tb-au-ainvr2-prm-plus-form-h-200tb-au",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 145404,
    priceNGN: 145404 * 1500,
    description: "AI NVR 2 PRM PLUS FORM H 200 TB 2U Rack Mnt; HardenedOS; 5Y Onsite 4HMC; AU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium%20Plus.png"],
    specifications: [
      { label: "SKU", value: "AINVR2-PRM-PLUS-FORM-H-200TB-AU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 57,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2-PRM-PLUS-FORM-H-200TB-AU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-30",
    sku: "AINVR2-PRM-PLUS-FORM-H-200TB-EU",
    name: "AINVR2-PRM-PLUS-FORM-H-200TB-EU",
    slug: "ainvr2-prm-plus-form-h-200tb-eu-ainvr2-prm-plus-form-h-200tb-eu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 145404,
    priceNGN: 145404 * 1500,
    description: "AI NVR 2 PRM PLUS FORM H 200 TB 2U Rack Mnt; HardenedOS; 5Y Onsite 4HMC; EU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium%20Plus.png"],
    specifications: [
      { label: "SKU", value: "AINVR2-PRM-PLUS-FORM-H-200TB-EU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2-PRM-PLUS-FORM-H-200TB-EU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-31",
    sku: "AINVR2-PRM-PLUS-FORM-H-200TB-NA",
    name: "AINVR2-PRM-PLUS-FORM-H-200TB-NA",
    slug: "ainvr2-prm-plus-form-h-200tb-na-ainvr2-prm-plus-form-h-200tb-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 145404,
    priceNGN: 145404 * 1500,
    description: "AI NVR 2 PRM PLUS FORM H 200 TB 2U Rack Mnt; HardenedOS; 5Y Onsite 4HMC; NA",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium%20Plus.png"],
    specifications: [
      { label: "SKU", value: "AINVR2-PRM-PLUS-FORM-H-200TB-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 73,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2-PRM-PLUS-FORM-H-200TB-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-32",
    sku: "AINVR2-PRM-PLUS-FORM-H-200TB-UK",
    name: "AINVR2-PRM-PLUS-FORM-H-200TB-UK",
    slug: "ainvr2-prm-plus-form-h-200tb-uk-ainvr2-prm-plus-form-h-200tb-uk",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 145404,
    priceNGN: 145404 * 1500,
    description: "AI NVR 2 PRM PLUS FORM H 200 TB 2U Rack Mnt; HardenedOS; 5Y Onsite 4HMC; UK",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium%20Plus.png"],
    specifications: [
      { label: "SKU", value: "AINVR2-PRM-PLUS-FORM-H-200TB-UK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 67,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2-PRM-PLUS-FORM-H-200TB-UK Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-33",
    sku: "AINVR2-PRM-PLUS-FORM-H-240TB-AU",
    name: "AINVR2-PRM-PLUS-FORM-H-240TB-AU",
    slug: "ainvr2-prm-plus-form-h-240tb-au-ainvr2-prm-plus-form-h-240tb-au",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 161280,
    priceNGN: 161280 * 1500,
    description: "AI NVR 2 PRM PLUS FORM H 240 TB 2U Rack Mnt; HardenedOS; 5Y Onsite 4HMC; AU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium%20Plus.png"],
    specifications: [
      { label: "SKU", value: "AINVR2-PRM-PLUS-FORM-H-240TB-AU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 46,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2-PRM-PLUS-FORM-H-240TB-AU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-34",
    sku: "AINVR2-PRM-PLUS-FORM-H-240TB-EU",
    name: "AINVR2-PRM-PLUS-FORM-H-240TB-EU",
    slug: "ainvr2-prm-plus-form-h-240tb-eu-ainvr2-prm-plus-form-h-240tb-eu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 161280,
    priceNGN: 161280 * 1500,
    description: "AI NVR 2 PRM PLUS FORM H 240 TB 2U Rack Mnt; HardenedOS; 5Y Onsite 4HMC; EU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium%20Plus.png"],
    specifications: [
      { label: "SKU", value: "AINVR2-PRM-PLUS-FORM-H-240TB-EU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2-PRM-PLUS-FORM-H-240TB-EU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-35",
    sku: "AINVR2-PRM-PLUS-FORM-H-240TB-NA",
    name: "AINVR2-PRM-PLUS-FORM-H-240TB-NA",
    slug: "ainvr2-prm-plus-form-h-240tb-na-ainvr2-prm-plus-form-h-240tb-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 161280,
    priceNGN: 161280 * 1500,
    description: "AI NVR 2 PRM PLUS FORM H 240 TB 2U Rack Mnt; HardenedOS; 5Y Onsite 4HMC; NA",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium%20Plus.png"],
    specifications: [
      { label: "SKU", value: "AINVR2-PRM-PLUS-FORM-H-240TB-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 93,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2-PRM-PLUS-FORM-H-240TB-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-36",
    sku: "AINVR2-PRM-PLUS-FORM-H-240TB-UK",
    name: "AINVR2-PRM-PLUS-FORM-H-240TB-UK",
    slug: "ainvr2-prm-plus-form-h-240tb-uk-ainvr2-prm-plus-form-h-240tb-uk",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 161280,
    priceNGN: 161280 * 1500,
    description: "AI NVR 2 PRM PLUS FORM H 240 TB 2U Rack Mnt; HardenedOS; 5Y Onsite 4HMC; UK",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium%20Plus.png"],
    specifications: [
      { label: "SKU", value: "AINVR2-PRM-PLUS-FORM-H-240TB-UK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 96,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2-PRM-PLUS-FORM-H-240TB-UK Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-37",
    sku: "AINVR2-PRM-PLUS-FORM-H-280TB-AU",
    name: "AINVR2-PRM-PLUS-FORM-H-280TB-AU",
    slug: "ainvr2-prm-plus-form-h-280tb-au-ainvr2-prm-plus-form-h-280tb-au",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 177030,
    priceNGN: 177030 * 1500,
    description: "AI NVR 2 PRM PLUS FORM H 280 TB 2U Rack Mnt; HardenedOS; 5Y Onsite 4HMC; AU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium%20Plus.png"],
    specifications: [
      { label: "SKU", value: "AINVR2-PRM-PLUS-FORM-H-280TB-AU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 65,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2-PRM-PLUS-FORM-H-280TB-AU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-38",
    sku: "AINVR2-PRM-PLUS-FORM-H-280TB-EU",
    name: "AINVR2-PRM-PLUS-FORM-H-280TB-EU",
    slug: "ainvr2-prm-plus-form-h-280tb-eu-ainvr2-prm-plus-form-h-280tb-eu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 177030,
    priceNGN: 177030 * 1500,
    description: "AI NVR 2 PRM PLUS FORM H 280 TB 2U Rack Mnt; HardenedOS; 5Y Onsite 4HMC; EU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium%20Plus.png"],
    specifications: [
      { label: "SKU", value: "AINVR2-PRM-PLUS-FORM-H-280TB-EU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 47,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2-PRM-PLUS-FORM-H-280TB-EU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-39",
    sku: "AINVR2-PRM-PLUS-FORM-H-280TB-NA",
    name: "AINVR2-PRM-PLUS-FORM-H-280TB-NA",
    slug: "ainvr2-prm-plus-form-h-280tb-na-ainvr2-prm-plus-form-h-280tb-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 177030,
    priceNGN: 177030 * 1500,
    description: "AI NVR 2 PRM PLUS FORM H 280 TB 2U Rack Mnt; HardenedOS; 5Y Onsite 4HMC; NA",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium%20Plus.png"],
    specifications: [
      { label: "SKU", value: "AINVR2-PRM-PLUS-FORM-H-280TB-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 57,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2-PRM-PLUS-FORM-H-280TB-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-40",
    sku: "AINVR2-PRM-PLUS-FORM-H-280TB-UK",
    name: "AINVR2-PRM-PLUS-FORM-H-280TB-UK",
    slug: "ainvr2-prm-plus-form-h-280tb-uk-ainvr2-prm-plus-form-h-280tb-uk",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 177030,
    priceNGN: 177030 * 1500,
    description: "AI NVR 2 PRM PLUS FORM H 280 TB 2U Rack Mnt; HardenedOS; 5Y Onsite 4HMC; UK",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium%20Plus.png"],
    specifications: [
      { label: "SKU", value: "AINVR2-PRM-PLUS-FORM-H-280TB-UK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2-PRM-PLUS-FORM-H-280TB-UK Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-41",
    sku: "AINVR2-PRM-PLUS-FORM-H-360TB-AU",
    name: "AINVR2-PRM-PLUS-FORM-H-360TB-AU",
    slug: "ainvr2-prm-plus-form-h-360tb-au-ainvr2-prm-plus-form-h-360tb-au",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 208026,
    priceNGN: 208026 * 1500,
    description: "AI NVR 2 PRM PLUS FORM H 360TB 2U Rack Mnt; HardenedOS; 5Y Onsite 4HMC; AU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium%20Plus.png"],
    specifications: [
      { label: "SKU", value: "AINVR2-PRM-PLUS-FORM-H-360TB-AU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 73,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2-PRM-PLUS-FORM-H-360TB-AU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-42",
    sku: "AINVR2-PRM-PLUS-FORM-H-360TB-EU",
    name: "AINVR2-PRM-PLUS-FORM-H-360TB-EU",
    slug: "ainvr2-prm-plus-form-h-360tb-eu-ainvr2-prm-plus-form-h-360tb-eu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 208026,
    priceNGN: 208026 * 1500,
    description: "AI NVR 2 PRM PLUS FORM H 360TB 2U Rack Mnt; HardenedOS; 5Y Onsite 4HMC; EU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium%20Plus.png"],
    specifications: [
      { label: "SKU", value: "AINVR2-PRM-PLUS-FORM-H-360TB-EU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 67,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2-PRM-PLUS-FORM-H-360TB-EU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-43",
    sku: "AINVR2-PRM-PLUS-FORM-H-360TB-NA",
    name: "AINVR2-PRM-PLUS-FORM-H-360TB-NA",
    slug: "ainvr2-prm-plus-form-h-360tb-na-ainvr2-prm-plus-form-h-360tb-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 208026,
    priceNGN: 208026 * 1500,
    description: "AI NVR 2 PRM PLUS FORM H 360TB 2U Rack Mnt; HardenedOS; 5Y Onsite 4HMC; NA",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium%20Plus.png"],
    specifications: [
      { label: "SKU", value: "AINVR2-PRM-PLUS-FORM-H-360TB-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 46,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2-PRM-PLUS-FORM-H-360TB-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-44",
    sku: "AINVR2-PRM-PLUS-FORM-H-360TB-UK",
    name: "AINVR2-PRM-PLUS-FORM-H-360TB-UK",
    slug: "ainvr2-prm-plus-form-h-360tb-uk-ainvr2-prm-plus-form-h-360tb-uk",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 208026,
    priceNGN: 208026 * 1500,
    description: "AI NVR 2 PRM PLUS FORM H 360TB 2U Rack Mnt; HardenedOS; 5Y Onsite 4HMC; UK",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium%20Plus.png"],
    specifications: [
      { label: "SKU", value: "AINVR2-PRM-PLUS-FORM-H-360TB-UK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2-PRM-PLUS-FORM-H-360TB-UK Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-45",
    sku: "AINVR2-PRM-PLUS-FORM-H-440TB-AU",
    name: "AINVR2-PRM-PLUS-FORM-H-440TB-AU",
    slug: "ainvr2-prm-plus-form-h-440tb-au-ainvr2-prm-plus-form-h-440tb-au",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 238644,
    priceNGN: 238644 * 1500,
    description: "AI NVR 2 PRM PLUS FORM H 440 TB 2U Rack Mnt; HardenedOS; 5Y Onsite 4HMC; AU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium%20Plus.png"],
    specifications: [
      { label: "SKU", value: "AINVR2-PRM-PLUS-FORM-H-440TB-AU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 93,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2-PRM-PLUS-FORM-H-440TB-AU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-46",
    sku: "AINVR2-PRM-PLUS-FORM-H-440TB-EU",
    name: "AINVR2-PRM-PLUS-FORM-H-440TB-EU",
    slug: "ainvr2-prm-plus-form-h-440tb-eu-ainvr2-prm-plus-form-h-440tb-eu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 238644,
    priceNGN: 238644 * 1500,
    description: "AI NVR 2 PRM PLUS FORM H 440 TB 2U Rack Mnt; HardenedOS; 5Y Onsite 4HMC; EU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium%20Plus.png"],
    specifications: [
      { label: "SKU", value: "AINVR2-PRM-PLUS-FORM-H-440TB-EU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 96,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2-PRM-PLUS-FORM-H-440TB-EU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-47",
    sku: "AINVR2-PRM-PLUS-FORM-H-440TB-NA",
    name: "AINVR2-PRM-PLUS-FORM-H-440TB-NA",
    slug: "ainvr2-prm-plus-form-h-440tb-na-ainvr2-prm-plus-form-h-440tb-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 238644,
    priceNGN: 238644 * 1500,
    description: "AI NVR 2 PRM PLUS FORM H 440 TB 2U Rack Mnt; HardenedOS; 5Y Onsite 4HMC; NA",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium%20Plus.png"],
    specifications: [
      { label: "SKU", value: "AINVR2-PRM-PLUS-FORM-H-440TB-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 65,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2-PRM-PLUS-FORM-H-440TB-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-48",
    sku: "AINVR2-PRM-PLUS-FORM-H-440TB-UK",
    name: "AINVR2-PRM-PLUS-FORM-H-440TB-UK",
    slug: "ainvr2-prm-plus-form-h-440tb-uk-ainvr2-prm-plus-form-h-440tb-uk",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 238644,
    priceNGN: 238644 * 1500,
    description: "AI NVR 2 PRM PLUS FORM H 440 TB 2U Rack Mnt; HardenedOS; 5Y Onsite 4HMC; UK",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium%20Plus.png"],
    specifications: [
      { label: "SKU", value: "AINVR2-PRM-PLUS-FORM-H-440TB-UK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 47,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2-PRM-PLUS-FORM-H-440TB-UK Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-49",
    sku: "AINVR2-STD-FORM-D-16TB-AU",
    name: "AINVR2-STD-FORM-D-16TB-AU",
    slug: "ainvr2-std-form-d-16tb-au-ainvr2-std-form-d-16tb-au",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 37800,
    priceNGN: 37800 * 1500,
    description: "AI NVR 2 STD FORM D 16TB 2U Rack Mnt; HardenedOS; 5Y Onsite NBD; AU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "AINVR2-STD-FORM-D-16TB-AU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 57,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2-STD-FORM-D-16TB-AU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-50",
    sku: "AINVR2-STD-FORM-D-16TB-EU",
    name: "AINVR2-STD-FORM-D-16TB-EU",
    slug: "ainvr2-std-form-d-16tb-eu-ainvr2-std-form-d-16tb-eu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 37800,
    priceNGN: 37800 * 1500,
    description: "AI NVR 2 STD FORM D 16TB 2U Rack Mnt; HardenedOS; 5Y Onsite NBD; EU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "AINVR2-STD-FORM-D-16TB-EU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2-STD-FORM-D-16TB-EU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-51",
    sku: "AINVR2-STD-FORM-D-16TB-NA",
    name: "AINVR2-STD-FORM-D-16TB-NA",
    slug: "ainvr2-std-form-d-16tb-na-ainvr2-std-form-d-16tb-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 37800,
    priceNGN: 37800 * 1500,
    description: "AI NVR 2 STD FORM D 16TB 2U Rack Mnt; HardenedOS; 5Y Onsite NBD; NA",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "AINVR2-STD-FORM-D-16TB-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 73,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2-STD-FORM-D-16TB-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-52",
    sku: "AINVR2-STD-FORM-D-16TB-UK",
    name: "AINVR2-STD-FORM-D-16TB-UK",
    slug: "ainvr2-std-form-d-16tb-uk-ainvr2-std-form-d-16tb-uk",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 37800,
    priceNGN: 37800 * 1500,
    description: "AI NVR 2 STD FORM D 16TB 2U Rack Mnt; HardenedOS; 5Y Onsite NBD; UK",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "AINVR2-STD-FORM-D-16TB-UK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 67,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2-STD-FORM-D-16TB-UK Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-53",
    sku: "AINVR2-STD-FORM-D-24TB-AU",
    name: "AINVR2-STD-FORM-D-24TB-AU",
    slug: "ainvr2-std-form-d-24tb-au-ainvr2-std-form-d-24tb-au",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 42588,
    priceNGN: 42588 * 1500,
    description: "AI NVR 2 STD FORM D 24TB 2U Rack Mnt; HardenedOS; 5Y Onsite NBD; AU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "AINVR2-STD-FORM-D-24TB-AU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 46,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2-STD-FORM-D-24TB-AU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-54",
    sku: "AINVR2-STD-FORM-D-24TB-EU",
    name: "AINVR2-STD-FORM-D-24TB-EU",
    slug: "ainvr2-std-form-d-24tb-eu-ainvr2-std-form-d-24tb-eu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 42588,
    priceNGN: 42588 * 1500,
    description: "AI NVR 2 STD FORM D 24TB 2U Rack Mnt; HardenedOS; 5Y Onsite NBD; EU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "AINVR2-STD-FORM-D-24TB-EU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2-STD-FORM-D-24TB-EU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-55",
    sku: "AINVR2-STD-FORM-D-24TB-NA",
    name: "AINVR2-STD-FORM-D-24TB-NA",
    slug: "ainvr2-std-form-d-24tb-na-ainvr2-std-form-d-24tb-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 42588,
    priceNGN: 42588 * 1500,
    description: "AI NVR 2 STD FORM D 24TB 2U Rack Mnt; HardenedOS; 5Y Onsite NBD; NA",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "AINVR2-STD-FORM-D-24TB-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 93,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2-STD-FORM-D-24TB-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-56",
    sku: "AINVR2-STD-FORM-D-24TB-UK",
    name: "AINVR2-STD-FORM-D-24TB-UK",
    slug: "ainvr2-std-form-d-24tb-uk-ainvr2-std-form-d-24tb-uk",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 42588,
    priceNGN: 42588 * 1500,
    description: "AI NVR 2 STD FORM D 24TB 2U Rack Mnt; HardenedOS; 5Y Onsite NBD; UK",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "AINVR2-STD-FORM-D-24TB-UK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 96,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2-STD-FORM-D-24TB-UK Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-57",
    sku: "AINVR2-STD-FORM-D-32TB-AU",
    name: "AINVR2-STD-FORM-D-32TB-AU",
    slug: "ainvr2-std-form-d-32tb-au-ainvr2-std-form-d-32tb-au",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 45864,
    priceNGN: 45864 * 1500,
    description: "AI NVR 2 STD FORM D 32TB 2U Rack Mnt; HardenedOS; 5Y Onsite NBD; AU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "AINVR2-STD-FORM-D-32TB-AU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 65,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2-STD-FORM-D-32TB-AU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-58",
    sku: "AINVR2-STD-FORM-D-32TB-EU",
    name: "AINVR2-STD-FORM-D-32TB-EU",
    slug: "ainvr2-std-form-d-32tb-eu-ainvr2-std-form-d-32tb-eu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 45864,
    priceNGN: 45864 * 1500,
    description: "AI NVR 2 STD FORM D 32TB 2U Rack Mnt; HardenedOS; 5Y Onsite NBD; EU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "AINVR2-STD-FORM-D-32TB-EU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 47,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2-STD-FORM-D-32TB-EU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-59",
    sku: "AINVR2-STD-FORM-D-32TB-NA",
    name: "AINVR2-STD-FORM-D-32TB-NA",
    slug: "ainvr2-std-form-d-32tb-na-ainvr2-std-form-d-32tb-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 45864,
    priceNGN: 45864 * 1500,
    description: "AI NVR 2 STD FORM D 32TB 2U Rack Mnt; HardenedOS; 5Y Onsite NBD; NA",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "AINVR2-STD-FORM-D-32TB-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 57,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2-STD-FORM-D-32TB-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-60",
    sku: "AINVR2-STD-FORM-D-32TB-UK",
    name: "AINVR2-STD-FORM-D-32TB-UK",
    slug: "ainvr2-std-form-d-32tb-uk-ainvr2-std-form-d-32tb-uk",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 45864,
    priceNGN: 45864 * 1500,
    description: "AI NVR 2 STD FORM D 32TB 2U Rack Mnt; HardenedOS; 5Y Onsite NBD; UK",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "AINVR2-STD-FORM-D-32TB-UK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2-STD-FORM-D-32TB-UK Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-61",
    sku: "AINVR2-STD-FORM-D-48TB-AU",
    name: "AINVR2-STD-FORM-D-48TB-AU",
    slug: "ainvr2-std-form-d-48tb-au-ainvr2-std-form-d-48tb-au",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 52542,
    priceNGN: 52542 * 1500,
    description: "AI NVR 2 STD FORM D 48TB 2U Rack Mnt; HardenedOS; 5Y Onsite NBD; AU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "AINVR2-STD-FORM-D-48TB-AU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 73,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2-STD-FORM-D-48TB-AU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-62",
    sku: "AINVR2-STD-FORM-D-48TB-EU",
    name: "AINVR2-STD-FORM-D-48TB-EU",
    slug: "ainvr2-std-form-d-48tb-eu-ainvr2-std-form-d-48tb-eu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 52542,
    priceNGN: 52542 * 1500,
    description: "AI NVR 2 STD FORM D 48TB 2U Rack Mnt; HardenedOS; 5Y Onsite NBD; EU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "AINVR2-STD-FORM-D-48TB-EU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 67,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2-STD-FORM-D-48TB-EU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-63",
    sku: "AINVR2-STD-FORM-D-48TB-NA",
    name: "AINVR2-STD-FORM-D-48TB-NA",
    slug: "ainvr2-std-form-d-48tb-na-ainvr2-std-form-d-48tb-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 52542,
    priceNGN: 52542 * 1500,
    description: "AI NVR 2 STD FORM D 48TB 2U Rack Mnt; HardenedOS; 5Y Onsite NBD; NA",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "AINVR2-STD-FORM-D-48TB-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 46,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2-STD-FORM-D-48TB-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-64",
    sku: "AINVR2-STD-FORM-D-48TB-UK",
    name: "AINVR2-STD-FORM-D-48TB-UK",
    slug: "ainvr2-std-form-d-48tb-uk-ainvr2-std-form-d-48tb-uk",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 52542,
    priceNGN: 52542 * 1500,
    description: "AI NVR 2 STD FORM D 48TB 2U Rack Mnt; HardenedOS; 5Y Onsite NBD; UK",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "AINVR2-STD-FORM-D-48TB-UK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2-STD-FORM-D-48TB-UK Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-65",
    sku: "AINVR2-STD-FORM-D-64TB-AU",
    name: "AINVR2-STD-FORM-D-64TB-AU",
    slug: "ainvr2-std-form-d-64tb-au-ainvr2-std-form-d-64tb-au",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 58338,
    priceNGN: 58338 * 1500,
    description: "AI NVR 2 STD FORM D 64TB 2U Rack Mnt; HardenedOS; 5Y Onsite NBD; AU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "AINVR2-STD-FORM-D-64TB-AU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 93,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2-STD-FORM-D-64TB-AU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-66",
    sku: "AINVR2-STD-FORM-D-64TB-EU",
    name: "AINVR2-STD-FORM-D-64TB-EU",
    slug: "ainvr2-std-form-d-64tb-eu-ainvr2-std-form-d-64tb-eu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 58338,
    priceNGN: 58338 * 1500,
    description: "AI NVR 2 STD FORM D 64TB 2U Rack Mnt; HardenedOS; 5Y Onsite NBD; EU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "AINVR2-STD-FORM-D-64TB-EU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 96,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2-STD-FORM-D-64TB-EU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-67",
    sku: "AINVR2-STD-FORM-D-64TB-NA",
    name: "AINVR2-STD-FORM-D-64TB-NA",
    slug: "ainvr2-std-form-d-64tb-na-ainvr2-std-form-d-64tb-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 58338,
    priceNGN: 58338 * 1500,
    description: "AI NVR 2 STD FORM D 64TB 2U Rack Mnt; HardenedOS; 5Y Onsite NBD; NA",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "AINVR2-STD-FORM-D-64TB-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 65,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2-STD-FORM-D-64TB-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-68",
    sku: "AINVR2-STD-FORM-D-64TB-UK",
    name: "AINVR2-STD-FORM-D-64TB-UK",
    slug: "ainvr2-std-form-d-64tb-uk-ainvr2-std-form-d-64tb-uk",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 58338,
    priceNGN: 58338 * 1500,
    description: "AI NVR 2 STD FORM D 64TB 2U Rack Mnt; HardenedOS; 5Y Onsite NBD; UK",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "AINVR2-STD-FORM-D-64TB-UK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 47,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2-STD-FORM-D-64TB-UK Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-69",
    sku: "AINVR2-VAL-6TB-EU",
    name: "AINVR2-VAL-6TB-EU",
    slug: "ainvr2-val-6tb-eu-ainvr2-val-6tb-eu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 8454.6,
    priceNGN: 8454.6 * 1500,
    description: "AI NVR 2 Value 6TB; 1U Rack Mount; Avigilon Hardened OS; EU",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR5%20Value%20resized.png"],
    specifications: [
      { label: "SKU", value: "AINVR2-VAL-6TB-EU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 57,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2-VAL-6TB-EU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-70",
    sku: "VMA-AIA2-WARR-EXTEND-2YR",
    name: "2 Year Warranty Extension for AIA2",
    slug: "2-year-warranty-extension-for-aia2-vma-aia2-warr-extend-2yr",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 1457.66,
    priceNGN: 1457.66 * 1500,
    description: "2 Year Warranty Extension for AI Appliance 2",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Warranty_070720.jpg"],
    specifications: [
      { label: "SKU", value: "VMA-AIA2-WARR-EXTEND-2YR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "2 Year Warranty Extension for AIA2 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-71",
    sku: "HD-NVR3-PRM-WARR-EXTEND-2YR",
    name: "2YR Warranty Extension; NVR3 Premium",
    slug: "2yr-warranty-extension-nvr3-premium-hd-nvr3-prm-warr-extend-2yr",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 5830.7,
    priceNGN: 5830.7 * 1500,
    description: "2 Year Warranty Extension for NVR3 Premium",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Warranty_070720.jpg"],
    specifications: [
      { label: "SKU", value: "HD-NVR3-PRM-WARR-EXTEND-2YR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 73,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "2YR Warranty Extension; NVR3 Premium Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-72",
    sku: "HD-NVR3-STD-WARR-EXTEND-2YR",
    name: "2YR Warranty Extension; NVR3 Standard",
    slug: "2yr-warranty-extension-nvr3-standard-hd-nvr3-std-warr-extend-2yr",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 3644.18,
    priceNGN: 3644.18 * 1500,
    description: "2 Year Warranty Extension for NVR3 Standard",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Warranty_070720.jpg"],
    specifications: [
      { label: "SKU", value: "HD-NVR3-STD-WARR-EXTEND-2YR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 67,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "2YR Warranty Extension; NVR3 Standard Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-73",
    sku: "HD-NVR3-VAL-WARR-EXTEND-2YR",
    name: "2YR Warranty Extension; NVR3 Value",
    slug: "2yr-warranty-extension-nvr3-value-hd-nvr3-val-warr-extend-2yr",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 2435.17,
    priceNGN: 2435.17 * 1500,
    description: "2 Year Warranty Extension for NVR3 Value",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Warranty_070720.jpg"],
    specifications: [
      { label: "SKU", value: "HD-NVR3-VAL-WARR-EXTEND-2YR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 46,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "2YR Warranty Extension; NVR3 Value Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-74",
    sku: "HD-NVR3-VAL-WARR-EXTEND-2YR-G2",
    name: "2YR Warranty Extension; NVR3 Value; Gen2",
    slug: "2yr-warranty-extension-nvr3-value-gen2-hd-nvr3-val-warr-extend-2yr-g2",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 2435.17,
    priceNGN: 2435.17 * 1500,
    description: "2 Year Warranty Extension for NVR3 Value",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Warranty_070720.jpg"],
    specifications: [
      { label: "SKU", value: "HD-NVR3-VAL-WARR-EXTEND-2YR-G2" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "2YR Warranty Extension; NVR3 Value; Gen2 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-75",
    sku: "HD-NVR4-PRM-WARR-EXTEND-2YR",
    name: "2YR Warranty Extension; NVR4 Premium",
    slug: "2yr-warranty-extension-nvr4-premium-hd-nvr4-prm-warr-extend-2yr",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 5830.7,
    priceNGN: 5830.7 * 1500,
    description: "2 Year Warranty Extension for NVR4 Premium",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Warranty_070720.jpg"],
    specifications: [
      { label: "SKU", value: "HD-NVR4-PRM-WARR-EXTEND-2YR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 93,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "2YR Warranty Extension; NVR4 Premium Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-76",
    sku: "HD-NVR4-STD-WARR-EXTEND-2YR",
    name: "2YR Warranty Extension; NVR4 Standard",
    slug: "2yr-warranty-extension-nvr4-standard-hd-nvr4-std-warr-extend-2yr",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 3644.18,
    priceNGN: 3644.18 * 1500,
    description: "2 Year Warranty Extension for NVR4 Standard",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Warranty_070720.jpg"],
    specifications: [
      { label: "SKU", value: "HD-NVR4-STD-WARR-EXTEND-2YR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 96,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "2YR Warranty Extension; NVR4 Standard Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-77",
    sku: "NVR4-VAL-WARR-EXTEND-2YR",
    name: "2YR Warranty Extension; NVR4 Value",
    slug: "2yr-warranty-extension-nvr4-value-nvr4-val-warr-extend-2yr",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 1457.66,
    priceNGN: 1457.66 * 1500,
    description: "2 Year Warranty Extension for NVR4 Value",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Warranty_070720.jpg"],
    specifications: [
      { label: "SKU", value: "NVR4-VAL-WARR-EXTEND-2YR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 65,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "2YR Warranty Extension; NVR4 Value Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-78",
    sku: "NVR4X-PRM1-WARR-5Y4HMC",
    name: "Warranty Upgrade to 4HMC for NVR4X Premium (64TB; 96TB; 128TB; 157TB)",
    slug: "warranty-upgrade-to-4hmc-for-nvr4x-premium-64tb-96tb-128tb-157tb-nvr4x-prm1-warr-5y4hmc",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 5830.7,
    priceNGN: 5830.7 * 1500,
    description: "Upgrade the 5 Year Next Business Day warranty to 5 Years 4 Hour Mission Critical for NVR4X PRM 64/96/128/157TB.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Warranty_070720.jpg"],
    specifications: [
      { label: "SKU", value: "NVR4X-PRM1-WARR-5Y4HMC" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 47,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Warranty Upgrade to 4HMC for NVR4X Premium (64TB; 96TB; 128TB; 157TB) Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-79",
    sku: "NVR4X-PRM2-WARR-5Y4HMC",
    name: "Warranty Upgrade to 4HMC for NVR4X Premium (192TB; 217TB)",
    slug: "warranty-upgrade-to-4hmc-for-nvr4x-premium-192tb-217tb-nvr4x-prm2-warr-5y4hmc",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 5830.7,
    priceNGN: 5830.7 * 1500,
    description: "Upgrade the 5 Year Next Business Day warranty to 5 Years 4 Hour Mission Critical for NVR4X PRM 192/217TB.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Warranty_070720.jpg"],
    specifications: [
      { label: "SKU", value: "NVR4X-PRM2-WARR-5Y4HMC" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 57,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Warranty Upgrade to 4HMC for NVR4X Premium (192TB; 217TB) Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-80",
    sku: "NVR4X-STD-WARR-5Y4HMC",
    name: "Warranty Upgrade to 4HMC for NVR4X Standard",
    slug: "warranty-upgrade-to-4hmc-for-nvr4x-standard-nvr4x-std-warr-5y4hmc",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 3644.18,
    priceNGN: 3644.18 * 1500,
    description: "Upgrade the 5 Year Next Business Day warranty to 5 Years 4 Hour Mission Critical for NVR4X STD.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Warranty_070720.jpg"],
    specifications: [
      { label: "SKU", value: "NVR4X-STD-WARR-5Y4HMC" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Warranty Upgrade to 4HMC for NVR4X Standard Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-81",
    sku: "NVR4X-WKS-WARR-EXTEND-2YR",
    name: "2 Year Extended Warranty for NVR4X Workstations",
    slug: "2-year-extended-warranty-for-nvr4x-workstations-nvr4x-wks-warr-extend-2yr",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 561.64,
    priceNGN: 561.64 * 1500,
    description: "2 Year Extended Warranty for NVR4X Workstations",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Warranty_070720.jpg"],
    specifications: [
      { label: "SKU", value: "NVR4X-WKS-WARR-EXTEND-2YR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 73,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "2 Year Extended Warranty for NVR4X Workstations Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-82",
    sku: "NVR5-PRM-252TB-S19-NA",
    name: "NVR5-PRM-252TB-S19-NA",
    slug: "nvr5-prm-252tb-s19-na-nvr5-prm-252tb-s19-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 132052.1,
    priceNGN: 132052.1 * 1500,
    description: "NVR5 PRM 252TB 2U Rack Mnt; WS19 NA",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR5-020822.jpg"],
    specifications: [
      { label: "SKU", value: "NVR5-PRM-252TB-S19-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 67,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR5-PRM-252TB-S19-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-83",
    sku: "NVR5-PRM-288TB-S19-EU",
    name: "NVR5-PRM-288TB-S19-EU",
    slug: "nvr5-prm-288tb-s19-eu-nvr5-prm-288tb-s19-eu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 146622.17,
    priceNGN: 146622.17 * 1500,
    description: "NVR5 PRM 288TB 2U Rack Mnt; WS19 EU",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR5-020822.jpg"],
    specifications: [
      { label: "SKU", value: "NVR5-PRM-288TB-S19-EU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 46,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR5-PRM-288TB-S19-EU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-84",
    sku: "NVR5-PRM-288TB-S19-NA",
    name: "NVR5-PRM-288TB-S19-NA",
    slug: "nvr5-prm-288tb-s19-na-nvr5-prm-288tb-s19-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 146622.17,
    priceNGN: 146622.17 * 1500,
    description: "NVR5 PRM 288TB 2U Rack Mnt; WS19 NA",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR5-020822.jpg"],
    specifications: [
      { label: "SKU", value: "NVR5-PRM-288TB-S19-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR5-PRM-288TB-S19-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-85",
    sku: "NVR5-PRM-288TB-S19-UK",
    name: "NVR5-PRM-288TB-S19-UK",
    slug: "nvr5-prm-288tb-s19-uk-nvr5-prm-288tb-s19-uk",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 146622.17,
    priceNGN: 146622.17 * 1500,
    description: "NVR5 PRM 288TB 2U Rack Mnt; WS19 UK",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR5-020822.jpg"],
    specifications: [
      { label: "SKU", value: "NVR5-PRM-288TB-S19-UK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 93,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR5-PRM-288TB-S19-UK Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-86",
    sku: "NVR5-PRM-360TB-S19-NA",
    name: "NVR5-PRM-360TB-S19-NA",
    slug: "nvr5-prm-360tb-s19-na-nvr5-prm-360tb-s19-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 174731.21,
    priceNGN: 174731.21 * 1500,
    description: "NVR5 PRM 360TB 2U Rack Mnt; WS19 NA",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR5-020822.jpg"],
    specifications: [
      { label: "SKU", value: "NVR5-PRM-360TB-S19-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 96,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR5-PRM-360TB-S19-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-87",
    sku: "NVR5-PRM-360TB-S19-UK",
    name: "NVR5-PRM-360TB-S19-UK",
    slug: "nvr5-prm-360tb-s19-uk-nvr5-prm-360tb-s19-uk",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 174731.21,
    priceNGN: 174731.21 * 1500,
    description: "NVR5 PRM 360TB 2U Rack Mnt; WS19 UK",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR5-020822.jpg"],
    specifications: [
      { label: "SKU", value: "NVR5-PRM-360TB-S19-UK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 65,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR5-PRM-360TB-S19-UK Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-88",
    sku: "NVR-KYD-WARR-1YR-A",
    name: "NVR-KYD-WARR-1YR-A",
    slug: "nvr-kyd-warr-1yr-a-nvr-kyd-warr-1yr-a",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 465.07,
    priceNGN: 465.07 * 1500,
    description: "1 Yr Keep Your Drive Wty;NVR5 STD/PRM 16-224 TB",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Warranty_070720.jpg"],
    specifications: [
      { label: "SKU", value: "NVR-KYD-WARR-1YR-A" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 47,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR-KYD-WARR-1YR-A Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-89",
    sku: "NVR-KYD-WARR-2YR-A",
    name: "NVR-KYD-WARR-2YR-A",
    slug: "nvr-kyd-warr-2yr-a-nvr-kyd-warr-2yr-a",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 694.13,
    priceNGN: 694.13 * 1500,
    description: "2 Yr Keep Your Drive Wty;NVR5 STD/PRM 16-224 TB",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Warranty_070720.jpg"],
    specifications: [
      { label: "SKU", value: "NVR-KYD-WARR-2YR-A" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 57,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR-KYD-WARR-2YR-A Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-90",
    sku: "NVR-KYD-WARR-3YR-A",
    name: "NVR-KYD-WARR-3YR-A",
    slug: "nvr-kyd-warr-3yr-a-nvr-kyd-warr-3yr-a",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 923.2,
    priceNGN: 923.2 * 1500,
    description: "3 Yr Keep Your Drive Wty;NVR5 STD/PRM 16-224 TB",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Warranty_070720.jpg"],
    specifications: [
      { label: "SKU", value: "NVR-KYD-WARR-3YR-A" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR-KYD-WARR-3YR-A Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-91",
    sku: "NVR-KYD-WARR-4YR-A",
    name: "NVR-KYD-WARR-4YR-A",
    slug: "nvr-kyd-warr-4yr-a-nvr-kyd-warr-4yr-a",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 1159.2,
    priceNGN: 1159.2 * 1500,
    description: "4 Yr Keep Your Drive Wty;NVR5 STD/PRM 16-224 TB",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Warranty_070720.jpg"],
    specifications: [
      { label: "SKU", value: "NVR-KYD-WARR-4YR-A" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 73,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR-KYD-WARR-4YR-A Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-92",
    sku: "NVR-KYD-WARR-5YR-A",
    name: "NVR-KYD-WARR-5YR-A",
    slug: "nvr-kyd-warr-5yr-a-nvr-kyd-warr-5yr-a",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 1388.26,
    priceNGN: 1388.26 * 1500,
    description: "5 Yr Keep Your Drive Wty;NVR5 STD/PRM 16-224 TB",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Warranty_070720.jpg"],
    specifications: [
      { label: "SKU", value: "NVR-KYD-WARR-5YR-A" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 67,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR-KYD-WARR-5YR-A Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-93",
    sku: "NVR-KYD-WARR-5YR-B",
    name: "NVR-KYD-WARR-5YR-B",
    slug: "nvr-kyd-warr-5yr-b-nvr-kyd-warr-5yr-b",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 6742.26,
    priceNGN: 6742.26 * 1500,
    description: "WARRANTY; 5 Yr KYD; NVR5 PRM 252TB+",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Warranty_070720.jpg"],
    specifications: [
      { label: "SKU", value: "NVR-KYD-WARR-5YR-B" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 46,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR-KYD-WARR-5YR-B Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-94",
    sku: "NVR5-PRM1-WARR-5Y4HMC-EDU",
    name: "NVR5-PRM1-WARR-5Y4HMC-EDU",
    slug: "nvr5-prm1-warr-5y4hmc-edu-nvr5-prm1-warr-5y4hmc-edu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 12903.17,
    priceNGN: 12903.17 * 1500,
    description: "WARR;UPG 5Y4HMC; 96-160TB;NVR5 PRM;EDU",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Warranty_070720.jpg"],
    specifications: [
      { label: "SKU", value: "NVR5-PRM1-WARR-5Y4HMC-EDU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR5-PRM1-WARR-5Y4HMC-EDU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-95",
    sku: "NVR5-PRM1-WARR-5YNBD-EDU",
    name: "NVR5-PRM1-WARR-5YNBD-EDU",
    slug: "nvr5-prm1-warr-5ynbd-edu-nvr5-prm1-warr-5ynbd-edu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 7349.62,
    priceNGN: 7349.62 * 1500,
    description: "WARRANTY;UPG 2 NBD;96-160TB;NVR5 PRM;EDU",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Warranty_070720.jpg"],
    specifications: [
      { label: "SKU", value: "NVR5-PRM1-WARR-5YNBD-EDU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 93,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR5-PRM1-WARR-5YNBD-EDU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-96",
    sku: "NVR5-PRM2-WARR-5Y4HMC-EDU",
    name: "NVR5-PRM2-WARR-5Y4HMC-EDU",
    slug: "nvr5-prm2-warr-5y4hmc-edu-nvr5-prm2-warr-5y4hmc-edu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 12903.17,
    priceNGN: 12903.17 * 1500,
    description: "WARR;UPG 5Y4HMC;192/224TB;NVR5 PRM;EDU",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Warranty_070720.jpg"],
    specifications: [
      { label: "SKU", value: "NVR5-PRM2-WARR-5Y4HMC-EDU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 96,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR5-PRM2-WARR-5Y4HMC-EDU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-97",
    sku: "NVR5-PRM2-WARR-5YNBD-EDU",
    name: "NVR5-PRM2-WARR-5YNBD-EDU",
    slug: "nvr5-prm2-warr-5ynbd-edu-nvr5-prm2-warr-5ynbd-edu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 7349.62,
    priceNGN: 7349.62 * 1500,
    description: "WARRANTY;UPG 2 NBD;192/224TB;NVR5 PRM;EDU",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Warranty_070720.jpg"],
    specifications: [
      { label: "SKU", value: "NVR5-PRM2-WARR-5YNBD-EDU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 65,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR5-PRM2-WARR-5YNBD-EDU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-98",
    sku: "NVR5-STD-WARR-5Y4HMC",
    name: "NVR5-STD-WARR-5Y4HMC",
    slug: "nvr5-std-warr-5y4hmc-nvr5-std-warr-5y4hmc",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 3471.29,
    priceNGN: 3471.29 * 1500,
    description: "WARRANTY;UPG to 4HR; NVR5 STD",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Warranty_070720.jpg"],
    specifications: [
      { label: "SKU", value: "NVR5-STD-WARR-5Y4HMC" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 47,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR5-STD-WARR-5Y4HMC Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-99",
    sku: "NVR5-STD-WARR-5YNBD-EDU",
    name: "NVR5-STD-WARR-5YNBD-EDU",
    slug: "nvr5-std-warr-5ynbd-edu-nvr5-std-warr-5ynbd-edu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 3402.6,
    priceNGN: 3402.6 * 1500,
    description: "WARRANTY;UPG 2 NBD;NVR5 STD;EDU",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Warranty_070720.jpg"],
    specifications: [
      { label: "SKU", value: "NVR5-STD-WARR-5YNBD-EDU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 57,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR5-STD-WARR-5YNBD-EDU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-100",
    sku: "AINVR2X-PRM-FORM-D-120TB-AU",
    name: "AINVR2X-PRM-FORM-D-120TB-AU",
    slug: "ainvr2x-prm-form-d-120tb-au-ainvr2x-prm-form-d-120tb-au",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 92484,
    priceNGN: 92484 * 1500,
    description: "AI NVR 2X PRM FORM D 120 TB 2U Rack Mnt; HardenedOS; 5Y Onsite 4HMC; NA",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Video-Infrastructure-Devices-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "AINVR2X-PRM-FORM-D-120TB-AU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2X-PRM-FORM-D-120TB-AU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-101",
    sku: "AINVR2X-PRM-FORM-D-120TB-EU",
    name: "AINVR2X-PRM-FORM-D-120TB-EU",
    slug: "ainvr2x-prm-form-d-120tb-eu-ainvr2x-prm-form-d-120tb-eu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 92484,
    priceNGN: 92484 * 1500,
    description: "AI NVR 2X PRM FORM D 120 TB 2U Rack Mnt; HardenedOS; 5Y Onsite 4HMC; NA",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Video-Infrastructure-Devices-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "AINVR2X-PRM-FORM-D-120TB-EU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 73,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2X-PRM-FORM-D-120TB-EU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-102",
    sku: "AINVR2X-PRM-FORM-D-120TB-NA",
    name: "AINVR2X-PRM-FORM-D-120TB-NA",
    slug: "ainvr2x-prm-form-d-120tb-na-ainvr2x-prm-form-d-120tb-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 92484,
    priceNGN: 92484 * 1500,
    description: "AI NVR 2X PRM FORM D 120 TB 2U Rack Mnt; HardenedOS; 5Y Onsite 4HMC; NA",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Video-Infrastructure-Devices-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "AINVR2X-PRM-FORM-D-120TB-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 67,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2X-PRM-FORM-D-120TB-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-103",
    sku: "AINVR2X-PRM-FORM-D-120TB-UK",
    name: "AINVR2X-PRM-FORM-D-120TB-UK",
    slug: "ainvr2x-prm-form-d-120tb-uk-ainvr2x-prm-form-d-120tb-uk",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 92484,
    priceNGN: 92484 * 1500,
    description: "AI NVR 2X PRM FORM D 120 TB 2U Rack Mnt; HardenedOS; 5Y Onsite 4HMC; NA",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Video-Infrastructure-Devices-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "AINVR2X-PRM-FORM-D-120TB-UK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 46,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2X-PRM-FORM-D-120TB-UK Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-104",
    sku: "AINVR2X-PRM-FORM-D-160TB-AU",
    name: "AINVR2X-PRM-FORM-D-160TB-AU",
    slug: "ainvr2x-prm-form-d-160tb-au-ainvr2x-prm-form-d-160tb-au",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 106470,
    priceNGN: 106470 * 1500,
    description: "AI NVR 2X PRM FORM D 160TB 2U Rack Mnt; HardenedOS; 5Y Onsite 4HMC; NA",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Video-Infrastructure-Devices-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "AINVR2X-PRM-FORM-D-160TB-AU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2X-PRM-FORM-D-160TB-AU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-105",
    sku: "AINVR2X-PRM-FORM-D-160TB-EU",
    name: "AINVR2X-PRM-FORM-D-160TB-EU",
    slug: "ainvr2x-prm-form-d-160tb-eu-ainvr2x-prm-form-d-160tb-eu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 106470,
    priceNGN: 106470 * 1500,
    description: "AI NVR 2X PRM FORM D 160TB 2U Rack Mnt; HardenedOS; 5Y Onsite 4HMC; NA",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Video-Infrastructure-Devices-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "AINVR2X-PRM-FORM-D-160TB-EU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 93,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2X-PRM-FORM-D-160TB-EU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-106",
    sku: "AINVR2X-PRM-FORM-D-160TB-NA",
    name: "AINVR2X-PRM-FORM-D-160TB-NA",
    slug: "ainvr2x-prm-form-d-160tb-na-ainvr2x-prm-form-d-160tb-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 106470,
    priceNGN: 106470 * 1500,
    description: "AI NVR 2X PRM FORM D 160TB 2U Rack Mnt; HardenedOS; 5Y Onsite 4HMC; NA",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Video-Infrastructure-Devices-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "AINVR2X-PRM-FORM-D-160TB-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 96,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2X-PRM-FORM-D-160TB-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-107",
    sku: "AINVR2X-PRM-FORM-D-160TB-UK",
    name: "AINVR2X-PRM-FORM-D-160TB-UK",
    slug: "ainvr2x-prm-form-d-160tb-uk-ainvr2x-prm-form-d-160tb-uk",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 106470,
    priceNGN: 106470 * 1500,
    description: "AI NVR 2X PRM FORM D 160TB 2U Rack Mnt; HardenedOS; 5Y Onsite 4HMC; NA",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Video-Infrastructure-Devices-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "AINVR2X-PRM-FORM-D-160TB-UK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 65,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2X-PRM-FORM-D-160TB-UK Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-108",
    sku: "AINVR2X-PRM-FORM-D-96TB-AU",
    name: "AINVR2X-PRM-FORM-D-96TB-AU",
    slug: "ainvr2x-prm-form-d-96tb-au-ainvr2x-prm-form-d-96tb-au",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 83790,
    priceNGN: 83790 * 1500,
    description: "AI NVR 2X PRM FORM D 96TB 2U Rack Mnt; HardenedOS; 5Y Onsite 4HMC; AU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Video-Infrastructure-Devices-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "AINVR2X-PRM-FORM-D-96TB-AU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 47,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2X-PRM-FORM-D-96TB-AU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-109",
    sku: "AINVR2X-PRM-FORM-D-96TB-EU",
    name: "AINVR2X-PRM-FORM-D-96TB-EU",
    slug: "ainvr2x-prm-form-d-96tb-eu-ainvr2x-prm-form-d-96tb-eu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 83790,
    priceNGN: 83790 * 1500,
    description: "AI NVR 2X PRM FORM D 96TB 2U Rack Mnt; HardenedOS; 5Y Onsite 4HMC; AU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Video-Infrastructure-Devices-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "AINVR2X-PRM-FORM-D-96TB-EU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 57,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2X-PRM-FORM-D-96TB-EU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-110",
    sku: "AINVR2X-PRM-FORM-D-96TB-NA",
    name: "AINVR2X-PRM-FORM-D-96TB-NA",
    slug: "ainvr2x-prm-form-d-96tb-na-ainvr2x-prm-form-d-96tb-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 83790,
    priceNGN: 83790 * 1500,
    description: "AI NVR 2X PRM FORM D 96TB 2U Rack Mnt; HardenedOS; 5Y Onsite 4HMC; AU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Video-Infrastructure-Devices-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "AINVR2X-PRM-FORM-D-96TB-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2X-PRM-FORM-D-96TB-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-111",
    sku: "AINVR2X-PRM-FORM-D-96TB-UK",
    name: "AINVR2X-PRM-FORM-D-96TB-UK",
    slug: "ainvr2x-prm-form-d-96tb-uk-ainvr2x-prm-form-d-96tb-uk",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 83790,
    priceNGN: 83790 * 1500,
    description: "AI NVR 2X PRM FORM D 96TB 2U Rack Mnt; HardenedOS; 5Y Onsite 4HMC; AU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Video-Infrastructure-Devices-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "AINVR2X-PRM-FORM-D-96TB-UK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 73,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2X-PRM-FORM-D-96TB-UK Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-112",
    sku: "AINVR2X-PRM-FORM-D-ANK",
    name: "AINVR2X-PRM-FORM-D-ANK",
    slug: "ainvr2x-prm-form-d-ank-ainvr2x-prm-form-d-ank",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 1867.32,
    priceNGN: 1867.32 * 1500,
    description: "Analytics Kit for AI NVR 2X Premium Form D",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/ENVR2%20Plus_Front-171022.jpg"],
    specifications: [
      { label: "SKU", value: "AINVR2X-PRM-FORM-D-ANK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 67,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "AINVR2X-PRM-FORM-D-ANK Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-113",
    sku: "NVR6-PRM-FORM-D-120TB-S22-AU",
    name: "NVR6-PRM-FORM-D-120TB-S22-AU",
    slug: "nvr6-prm-form-d-120tb-s22-au-nvr6-prm-form-d-120tb-s22-au",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 92484,
    priceNGN: 92484 * 1500,
    description: "NVR6 PRM FORM D 120 TB 2U Rack Mnt; WS22; 5Y Onsite 4HMC; AU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-PRM-FORM-D-120TB-S22-AU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 46,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-PRM-FORM-D-120TB-S22-AU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-114",
    sku: "NVR6-PRM-FORM-D-120TB-S22-EU",
    name: "NVR6-PRM-FORM-D-120TB-S22-EU",
    slug: "nvr6-prm-form-d-120tb-s22-eu-nvr6-prm-form-d-120tb-s22-eu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 92484,
    priceNGN: 92484 * 1500,
    description: "NVR6 PRM FORM D 120 TB 2U Rack Mnt; WS22; 5Y Onsite 4HMC; EU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-PRM-FORM-D-120TB-S22-EU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-PRM-FORM-D-120TB-S22-EU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-115",
    sku: "NVR6-PRM-FORM-D-120TB-S22-NA",
    name: "NVR6-PRM-FORM-D-120TB-S22-NA",
    slug: "nvr6-prm-form-d-120tb-s22-na-nvr6-prm-form-d-120tb-s22-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 92484,
    priceNGN: 92484 * 1500,
    description: "NVR6 PRM FORM D 120 TB 2U Rack Mnt; WS22; 5Y Onsite 4HMC; NA",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-PRM-FORM-D-120TB-S22-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 93,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-PRM-FORM-D-120TB-S22-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-116",
    sku: "NVR6-PRM-FORM-D-120TB-S22-UK",
    name: "NVR6-PRM-FORM-D-120TB-S22-UK",
    slug: "nvr6-prm-form-d-120tb-s22-uk-nvr6-prm-form-d-120tb-s22-uk",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 92484,
    priceNGN: 92484 * 1500,
    description: "NVR6 PRM FORM D 120 TB 2U Rack Mnt; WS22; 5Y Onsite 4HMC; UK",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-PRM-FORM-D-120TB-S22-UK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 96,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-PRM-FORM-D-120TB-S22-UK Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-117",
    sku: "NVR6-PRM-FORM-D-160TB-S22-AU",
    name: "NVR6-PRM-FORM-D-160TB-S22-AU",
    slug: "nvr6-prm-form-d-160tb-s22-au-nvr6-prm-form-d-160tb-s22-au",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 106470,
    priceNGN: 106470 * 1500,
    description: "NVR6 PRM FORM D 160TB 2U Rack Mnt; WS22; 5Y Onsite 4HMC; AU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-PRM-FORM-D-160TB-S22-AU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 65,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-PRM-FORM-D-160TB-S22-AU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-118",
    sku: "NVR6-PRM-FORM-D-160TB-S22-EU",
    name: "NVR6-PRM-FORM-D-160TB-S22-EU",
    slug: "nvr6-prm-form-d-160tb-s22-eu-nvr6-prm-form-d-160tb-s22-eu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 106470,
    priceNGN: 106470 * 1500,
    description: "NVR6 PRM FORM D 160TB 2U Rack Mnt; WS22; 5Y Onsite 4HMC; EU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-PRM-FORM-D-160TB-S22-EU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 47,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-PRM-FORM-D-160TB-S22-EU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-119",
    sku: "NVR6-PRM-FORM-D-160TB-S22-NA",
    name: "NVR6-PRM-FORM-D-160TB-S22-NA",
    slug: "nvr6-prm-form-d-160tb-s22-na-nvr6-prm-form-d-160tb-s22-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 106470,
    priceNGN: 106470 * 1500,
    description: "NVR6 PRM FORM D 160TB 2U Rack Mnt; WS22; 5Y Onsite 4HMC; NA",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-PRM-FORM-D-160TB-S22-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 57,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-PRM-FORM-D-160TB-S22-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-120",
    sku: "NVR6-PRM-FORM-D-160TB-S22-UK",
    name: "NVR6-PRM-FORM-D-160TB-S22-UK",
    slug: "nvr6-prm-form-d-160tb-s22-uk-nvr6-prm-form-d-160tb-s22-uk",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 106470,
    priceNGN: 106470 * 1500,
    description: "NVR6 PRM FORM D 160TB 2U Rack Mnt; WS22; 5Y Onsite 4HMC; UK",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-PRM-FORM-D-160TB-S22-UK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-PRM-FORM-D-160TB-S22-UK Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-121",
    sku: "NVR6-PRM-FORM-D-200TB-S22-AU",
    name: "NVR6-PRM-FORM-D-200TB-S22-AU",
    slug: "nvr6-prm-form-d-200tb-s22-au-nvr6-prm-form-d-200tb-s22-au",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 125244,
    priceNGN: 125244 * 1500,
    description: "NVR6 PRM FORM D 200 TB 2U Rack Mnt; WS22; 5Y Onsite 4HMC; AU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-PRM-FORM-D-200TB-S22-AU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 73,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-PRM-FORM-D-200TB-S22-AU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-122",
    sku: "NVR6-PRM-FORM-D-200TB-S22-NA",
    name: "NVR6-PRM-FORM-D-200TB-S22-NA",
    slug: "nvr6-prm-form-d-200tb-s22-na-nvr6-prm-form-d-200tb-s22-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 125244,
    priceNGN: 125244 * 1500,
    description: "NVR6 PRM FORM D 200 TB 2U Rack Mnt; WS22; 5Y Onsite 4HMC; NA",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-PRM-FORM-D-200TB-S22-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 67,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-PRM-FORM-D-200TB-S22-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-123",
    sku: "NVR6-PRM-FORM-D-200TB-S22-UK",
    name: "NVR6-PRM-FORM-D-200TB-S22-UK",
    slug: "nvr6-prm-form-d-200tb-s22-uk-nvr6-prm-form-d-200tb-s22-uk",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 125244,
    priceNGN: 125244 * 1500,
    description: "NVR6 PRM FORM D 200 TB 2U Rack Mnt; WS22; 5Y Onsite 4HMC; UK",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-PRM-FORM-D-200TB-S22-UK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 46,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-PRM-FORM-D-200TB-S22-UK Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-124",
    sku: "NVR6-PRM-FORM-D-72TB-S22-AU",
    name: "NVR6-PRM-FORM-D-72TB-S22-AU",
    slug: "nvr6-prm-form-d-72tb-s22-au-nvr6-prm-form-d-72tb-s22-au",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 72450,
    priceNGN: 72450 * 1500,
    description: "NVR6 PRM FORM D 72TB 2U Rack Mnt; WS22; 5Y Onsite 4HMC; AU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-PRM-FORM-D-72TB-S22-AU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-PRM-FORM-D-72TB-S22-AU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-125",
    sku: "NVR6-PRM-FORM-D-72TB-S22-EU",
    name: "NVR6-PRM-FORM-D-72TB-S22-EU",
    slug: "nvr6-prm-form-d-72tb-s22-eu-nvr6-prm-form-d-72tb-s22-eu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 72450,
    priceNGN: 72450 * 1500,
    description: "NVR6 PRM FORM D 72TB 2U Rack Mnt; WS22; 5Y Onsite 4HMC; EU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-PRM-FORM-D-72TB-S22-EU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 93,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-PRM-FORM-D-72TB-S22-EU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-126",
    sku: "NVR6-PRM-FORM-D-72TB-S22-NA",
    name: "NVR6-PRM-FORM-D-72TB-S22-NA",
    slug: "nvr6-prm-form-d-72tb-s22-na-nvr6-prm-form-d-72tb-s22-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 72450,
    priceNGN: 72450 * 1500,
    description: "NVR6 PRM FORM D 72TB 2U Rack Mnt; WS22; 5Y Onsite 4HMC; NA",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-PRM-FORM-D-72TB-S22-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 96,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-PRM-FORM-D-72TB-S22-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-127",
    sku: "NVR6-PRM-FORM-D-72TB-S22-UK",
    name: "NVR6-PRM-FORM-D-72TB-S22-UK",
    slug: "nvr6-prm-form-d-72tb-s22-uk-nvr6-prm-form-d-72tb-s22-uk",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 72450,
    priceNGN: 72450 * 1500,
    description: "NVR6 PRM FORM D 72TB 2U Rack Mnt; WS22; 5Y Onsite 4HMC; UK",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-PRM-FORM-D-72TB-S22-UK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 65,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-PRM-FORM-D-72TB-S22-UK Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-128",
    sku: "NVR6-PRM-FORM-D-96TB-S22-AU",
    name: "NVR6-PRM-FORM-D-96TB-S22-AU",
    slug: "nvr6-prm-form-d-96tb-s22-au-nvr6-prm-form-d-96tb-s22-au",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 83790,
    priceNGN: 83790 * 1500,
    description: "NVR6 PRM FORM D 96TB 2U Rack Mnt; WS22; 5Y Onsite 4HMC; AU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-PRM-FORM-D-96TB-S22-AU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 47,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-PRM-FORM-D-96TB-S22-AU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-129",
    sku: "NVR6-PRM-FORM-D-96TB-S22-EU",
    name: "NVR6-PRM-FORM-D-96TB-S22-EU",
    slug: "nvr6-prm-form-d-96tb-s22-eu-nvr6-prm-form-d-96tb-s22-eu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 83790,
    priceNGN: 83790 * 1500,
    description: "NVR6 PRM FORM D 96TB 2U Rack Mnt; WS22; 5Y Onsite 4HMC; EU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-PRM-FORM-D-96TB-S22-EU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 57,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-PRM-FORM-D-96TB-S22-EU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-130",
    sku: "NVR6-PRM-FORM-D-96TB-S22-NA",
    name: "NVR6-PRM-FORM-D-96TB-S22-NA",
    slug: "nvr6-prm-form-d-96tb-s22-na-nvr6-prm-form-d-96tb-s22-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 83790,
    priceNGN: 83790 * 1500,
    description: "NVR6 PRM FORM D 96TB 2U Rack Mnt; WS22; 5Y Onsite 4HMC; NA",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-PRM-FORM-D-96TB-S22-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-PRM-FORM-D-96TB-S22-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-131",
    sku: "NVR6-PRM-FORM-D-96TB-S22-UK",
    name: "NVR6-PRM-FORM-D-96TB-S22-UK",
    slug: "nvr6-prm-form-d-96tb-s22-uk-nvr6-prm-form-d-96tb-s22-uk",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 83790,
    priceNGN: 83790 * 1500,
    description: "NVR6 PRM FORM D 96TB 2U Rack Mnt; WS22; 5Y Onsite 4HMC; UK",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-PRM-FORM-D-96TB-S22-UK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 73,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-PRM-FORM-D-96TB-S22-UK Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-132",
    sku: "NVR6-PRM-PLUS-FORM-H-200TB-S22-AU",
    name: "NVR6-PRM-PLUS-FORM-H-200TB-S22-AU",
    slug: "nvr6-prm-plus-form-h-200tb-s22-au-nvr6-prm-plus-form-h-200tb-s22-au",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 145404,
    priceNGN: 145404 * 1500,
    description: "NVR6 PRM PLUS FORM H 200 TB 2U Rack Mnt; WS22; 5Y Onsite 4HMC; AU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium%20Plus.png"],
    specifications: [
      { label: "SKU", value: "NVR6-PRM-PLUS-FORM-H-200TB-S22-AU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 67,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-PRM-PLUS-FORM-H-200TB-S22-AU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-133",
    sku: "NVR6-PRM-PLUS-FORM-H-200TB-S22-EU",
    name: "NVR6-PRM-PLUS-FORM-H-200TB-S22-EU",
    slug: "nvr6-prm-plus-form-h-200tb-s22-eu-nvr6-prm-plus-form-h-200tb-s22-eu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 145404,
    priceNGN: 145404 * 1500,
    description: "NVR6 PRM PLUS FORM H 200 TB 2U Rack Mnt; WS22; 5Y Onsite 4HMC; EU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium%20Plus.png"],
    specifications: [
      { label: "SKU", value: "NVR6-PRM-PLUS-FORM-H-200TB-S22-EU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 46,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-PRM-PLUS-FORM-H-200TB-S22-EU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-134",
    sku: "NVR6-PRM-PLUS-FORM-H-200TB-S22-NA",
    name: "NVR6-PRM-PLUS-FORM-H-200TB-S22-NA",
    slug: "nvr6-prm-plus-form-h-200tb-s22-na-nvr6-prm-plus-form-h-200tb-s22-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 145404,
    priceNGN: 145404 * 1500,
    description: "NVR6 PRM PLUS FORM H 200 TB 2U Rack Mnt; WS22; 5Y Onsite 4HMC; NA",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium%20Plus.png"],
    specifications: [
      { label: "SKU", value: "NVR6-PRM-PLUS-FORM-H-200TB-S22-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-PRM-PLUS-FORM-H-200TB-S22-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-135",
    sku: "NVR6-PRM-PLUS-FORM-H-200TB-S22-UK",
    name: "NVR6-PRM-PLUS-FORM-H-200TB-S22-UK",
    slug: "nvr6-prm-plus-form-h-200tb-s22-uk-nvr6-prm-plus-form-h-200tb-s22-uk",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 145404,
    priceNGN: 145404 * 1500,
    description: "NVR6 PRM PLUS FORM H 200 TB 2U Rack Mnt; WS22; 5Y Onsite 4HMC; UK",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium%20Plus.png"],
    specifications: [
      { label: "SKU", value: "NVR6-PRM-PLUS-FORM-H-200TB-S22-UK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 93,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-PRM-PLUS-FORM-H-200TB-S22-UK Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-136",
    sku: "NVR6-PRM-PLUS-FORM-H-240TB-S22-AU",
    name: "NVR6-PRM-PLUS-FORM-H-240TB-S22-AU",
    slug: "nvr6-prm-plus-form-h-240tb-s22-au-nvr6-prm-plus-form-h-240tb-s22-au",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 161280,
    priceNGN: 161280 * 1500,
    description: "NVR6 PRM PLUS FORM H 240 TB 2U Rack Mnt; WS22; 5Y Onsite 4HMC; AU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium%20Plus.png"],
    specifications: [
      { label: "SKU", value: "NVR6-PRM-PLUS-FORM-H-240TB-S22-AU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 96,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-PRM-PLUS-FORM-H-240TB-S22-AU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-137",
    sku: "NVR6-PRM-PLUS-FORM-H-240TB-S22-EU",
    name: "NVR6-PRM-PLUS-FORM-H-240TB-S22-EU",
    slug: "nvr6-prm-plus-form-h-240tb-s22-eu-nvr6-prm-plus-form-h-240tb-s22-eu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 161280,
    priceNGN: 161280 * 1500,
    description: "NVR6 PRM PLUS FORM H 240 TB 2U Rack Mnt; WS22; 5Y Onsite 4HMC; EU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium%20Plus.png"],
    specifications: [
      { label: "SKU", value: "NVR6-PRM-PLUS-FORM-H-240TB-S22-EU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 65,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-PRM-PLUS-FORM-H-240TB-S22-EU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-138",
    sku: "NVR6-PRM-PLUS-FORM-H-240TB-S22-NA",
    name: "NVR6-PRM-PLUS-FORM-H-240TB-S22-NA",
    slug: "nvr6-prm-plus-form-h-240tb-s22-na-nvr6-prm-plus-form-h-240tb-s22-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 161280,
    priceNGN: 161280 * 1500,
    description: "NVR6 PRM PLUS FORM H 240 TB 2U Rack Mnt; WS22; 5Y Onsite 4HMC; NA",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium%20Plus.png"],
    specifications: [
      { label: "SKU", value: "NVR6-PRM-PLUS-FORM-H-240TB-S22-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 47,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-PRM-PLUS-FORM-H-240TB-S22-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-139",
    sku: "NVR6-PRM-PLUS-FORM-H-240TB-S22-UK",
    name: "NVR6-PRM-PLUS-FORM-H-240TB-S22-UK",
    slug: "nvr6-prm-plus-form-h-240tb-s22-uk-nvr6-prm-plus-form-h-240tb-s22-uk",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 161280,
    priceNGN: 161280 * 1500,
    description: "NVR6 PRM PLUS FORM H 240 TB 2U Rack Mnt; WS22; 5Y Onsite 4HMC; UK",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium%20Plus.png"],
    specifications: [
      { label: "SKU", value: "NVR6-PRM-PLUS-FORM-H-240TB-S22-UK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 57,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-PRM-PLUS-FORM-H-240TB-S22-UK Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-140",
    sku: "NVR6-PRM-PLUS-FORM-H-280TB-S22-AU",
    name: "NVR6-PRM-PLUS-FORM-H-280TB-S22-AU",
    slug: "nvr6-prm-plus-form-h-280tb-s22-au-nvr6-prm-plus-form-h-280tb-s22-au",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 177030,
    priceNGN: 177030 * 1500,
    description: "NVR6 PRM PLUS FORM H 280 TB 2U Rack Mnt; WS22; 5Y Onsite 4HMC; AU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium%20Plus.png"],
    specifications: [
      { label: "SKU", value: "NVR6-PRM-PLUS-FORM-H-280TB-S22-AU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-PRM-PLUS-FORM-H-280TB-S22-AU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-141",
    sku: "NVR6-PRM-PLUS-FORM-H-280TB-S22-EU",
    name: "NVR6-PRM-PLUS-FORM-H-280TB-S22-EU",
    slug: "nvr6-prm-plus-form-h-280tb-s22-eu-nvr6-prm-plus-form-h-280tb-s22-eu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 177030,
    priceNGN: 177030 * 1500,
    description: "NVR6 PRM PLUS FORM H 280 TB 2U Rack Mnt; WS22; 5Y Onsite 4HMC; EU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium%20Plus.png"],
    specifications: [
      { label: "SKU", value: "NVR6-PRM-PLUS-FORM-H-280TB-S22-EU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 73,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-PRM-PLUS-FORM-H-280TB-S22-EU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-142",
    sku: "NVR6-PRM-PLUS-FORM-H-280TB-S22-NA",
    name: "NVR6-PRM-PLUS-FORM-H-280TB-S22-NA",
    slug: "nvr6-prm-plus-form-h-280tb-s22-na-nvr6-prm-plus-form-h-280tb-s22-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 177030,
    priceNGN: 177030 * 1500,
    description: "NVR6 PRM PLUS FORM H 280 TB 2U Rack Mnt; WS22; 5Y Onsite 4HMC; NA",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium%20Plus.png"],
    specifications: [
      { label: "SKU", value: "NVR6-PRM-PLUS-FORM-H-280TB-S22-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 67,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-PRM-PLUS-FORM-H-280TB-S22-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-143",
    sku: "NVR6-PRM-PLUS-FORM-H-280TB-S22-UK",
    name: "NVR6-PRM-PLUS-FORM-H-280TB-S22-UK",
    slug: "nvr6-prm-plus-form-h-280tb-s22-uk-nvr6-prm-plus-form-h-280tb-s22-uk",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 177030,
    priceNGN: 177030 * 1500,
    description: "NVR6 PRM PLUS FORM H 280 TB 2U Rack Mnt; WS22; 5Y Onsite 4HMC; UK",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium%20Plus.png"],
    specifications: [
      { label: "SKU", value: "NVR6-PRM-PLUS-FORM-H-280TB-S22-UK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 46,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-PRM-PLUS-FORM-H-280TB-S22-UK Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-144",
    sku: "NVR6-PRM-PLUS-FORM-H-360TB-S22-AU",
    name: "NVR6-PRM-PLUS-FORM-H-360TB-S22-AU",
    slug: "nvr6-prm-plus-form-h-360tb-s22-au-nvr6-prm-plus-form-h-360tb-s22-au",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 208026,
    priceNGN: 208026 * 1500,
    description: "NVR6 PRM PLUS FORM H 360TB 2U Rack Mnt; WS22; 5Y Onsite 4HMC; AU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium%20Plus.png"],
    specifications: [
      { label: "SKU", value: "NVR6-PRM-PLUS-FORM-H-360TB-S22-AU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-PRM-PLUS-FORM-H-360TB-S22-AU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-145",
    sku: "NVR6-PRM-PLUS-FORM-H-360TB-S22-EU",
    name: "NVR6-PRM-PLUS-FORM-H-360TB-S22-EU",
    slug: "nvr6-prm-plus-form-h-360tb-s22-eu-nvr6-prm-plus-form-h-360tb-s22-eu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 208026,
    priceNGN: 208026 * 1500,
    description: "NVR6 PRM PLUS FORM H 360TB 2U Rack Mnt; WS22; 5Y Onsite 4HMC; EU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium%20Plus.png"],
    specifications: [
      { label: "SKU", value: "NVR6-PRM-PLUS-FORM-H-360TB-S22-EU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 93,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-PRM-PLUS-FORM-H-360TB-S22-EU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-146",
    sku: "NVR6-PRM-PLUS-FORM-H-360TB-S22-NA",
    name: "NVR6-PRM-PLUS-FORM-H-360TB-S22-NA",
    slug: "nvr6-prm-plus-form-h-360tb-s22-na-nvr6-prm-plus-form-h-360tb-s22-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 208026,
    priceNGN: 208026 * 1500,
    description: "NVR6 PRM PLUS FORM H 360TB 2U Rack Mnt; WS22; 5Y Onsite 4HMC; NA",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium%20Plus.png"],
    specifications: [
      { label: "SKU", value: "NVR6-PRM-PLUS-FORM-H-360TB-S22-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 96,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-PRM-PLUS-FORM-H-360TB-S22-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-147",
    sku: "NVR6-PRM-PLUS-FORM-H-360TB-S22-UK",
    name: "NVR6-PRM-PLUS-FORM-H-360TB-S22-UK",
    slug: "nvr6-prm-plus-form-h-360tb-s22-uk-nvr6-prm-plus-form-h-360tb-s22-uk",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 208026,
    priceNGN: 208026 * 1500,
    description: "NVR6 PRM PLUS FORM H 360TB 2U Rack Mnt; WS22; 5Y Onsite 4HMC; UK",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium%20Plus.png"],
    specifications: [
      { label: "SKU", value: "NVR6-PRM-PLUS-FORM-H-360TB-S22-UK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 65,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-PRM-PLUS-FORM-H-360TB-S22-UK Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-148",
    sku: "NVR6-PRM-PLUS-FORM-H-440TB-S22-AU",
    name: "NVR6-PRM-PLUS-FORM-H-440TB-S22-AU",
    slug: "nvr6-prm-plus-form-h-440tb-s22-au-nvr6-prm-plus-form-h-440tb-s22-au",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 238644,
    priceNGN: 238644 * 1500,
    description: "NVR6 PRM PLUS FORM H 440 TB 2U Rack Mnt; WS22; 5Y Onsite 4HMC; AU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium%20Plus.png"],
    specifications: [
      { label: "SKU", value: "NVR6-PRM-PLUS-FORM-H-440TB-S22-AU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 47,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-PRM-PLUS-FORM-H-440TB-S22-AU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-149",
    sku: "NVR6-PRM-PLUS-FORM-H-440TB-S22-EU",
    name: "NVR6-PRM-PLUS-FORM-H-440TB-S22-EU",
    slug: "nvr6-prm-plus-form-h-440tb-s22-eu-nvr6-prm-plus-form-h-440tb-s22-eu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 238644,
    priceNGN: 238644 * 1500,
    description: "NVR6 PRM PLUS FORM H 440 TB 2U Rack Mnt; WS22; 5Y Onsite 4HMC; EU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium%20Plus.png"],
    specifications: [
      { label: "SKU", value: "NVR6-PRM-PLUS-FORM-H-440TB-S22-EU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 57,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-PRM-PLUS-FORM-H-440TB-S22-EU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-150",
    sku: "NVR6-PRM-PLUS-FORM-H-440TB-S22-NA",
    name: "NVR6-PRM-PLUS-FORM-H-440TB-S22-NA",
    slug: "nvr6-prm-plus-form-h-440tb-s22-na-nvr6-prm-plus-form-h-440tb-s22-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 238644,
    priceNGN: 238644 * 1500,
    description: "NVR6 PRM PLUS FORM H 440 TB 2U Rack Mnt; WS22; 5Y Onsite 4HMC; NA",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium%20Plus.png"],
    specifications: [
      { label: "SKU", value: "NVR6-PRM-PLUS-FORM-H-440TB-S22-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-PRM-PLUS-FORM-H-440TB-S22-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-151",
    sku: "NVR6-PRM-PLUS-FORM-H-440TB-S22-UK",
    name: "NVR6-PRM-PLUS-FORM-H-440TB-S22-UK",
    slug: "nvr6-prm-plus-form-h-440tb-s22-uk-nvr6-prm-plus-form-h-440tb-s22-uk",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 238644,
    priceNGN: 238644 * 1500,
    description: "NVR6 PRM PLUS FORM H 440 TB 2U Rack Mnt; WS22; 5Y Onsite 4HMC; UK",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium%20Plus.png"],
    specifications: [
      { label: "SKU", value: "NVR6-PRM-PLUS-FORM-H-440TB-S22-UK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 73,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-PRM-PLUS-FORM-H-440TB-S22-UK Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-152",
    sku: "NVR6-STD-FIPS-FORM-D-16TB-NA",
    name: "NVR6-STD-FIPS-FORM-D-16TB-NA",
    slug: "nvr6-std-fips-form-d-16tb-na-nvr6-std-fips-form-d-16tb-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 42966,
    priceNGN: 42966 * 1500,
    description: "NVR6 STD FIPS 16TB; Form D 2U Rack Mnt; WS19 NA. Available in United States Only.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Video-Infrastructure-Devices-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FIPS-FORM-D-16TB-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 67,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FIPS-FORM-D-16TB-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-153",
    sku: "NVR6-STD-FIPS-FORM-D-24TB-NA",
    name: "NVR6-STD-FIPS-FORM-D-24TB-NA",
    slug: "nvr6-std-fips-form-d-24tb-na-nvr6-std-fips-form-d-24tb-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 48258,
    priceNGN: 48258 * 1500,
    description: "NVR6 STD FIPS 24TB; Form D 2U Rack Mnt; WS19 NA. Available in United States Only.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Video-Infrastructure-Devices-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FIPS-FORM-D-24TB-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 46,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FIPS-FORM-D-24TB-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-154",
    sku: "NVR6-STD-FIPS-FORM-D-32TB-NA",
    name: "NVR6-STD-FIPS-FORM-D-32TB-NA",
    slug: "nvr6-std-fips-form-d-32tb-na-nvr6-std-fips-form-d-32tb-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 51786,
    priceNGN: 51786 * 1500,
    description: "NVR6 STD FIPS 32TB; Form D 2U Rack Mnt; WS19 NA. Available in United States Only.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Video-Infrastructure-Devices-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FIPS-FORM-D-32TB-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FIPS-FORM-D-32TB-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-155",
    sku: "NVR6-STD-FIPS-FORM-D-48TB-NA",
    name: "NVR6-STD-FIPS-FORM-D-48TB-NA",
    slug: "nvr6-std-fips-form-d-48tb-na-nvr6-std-fips-form-d-48tb-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 59220,
    priceNGN: 59220 * 1500,
    description: "NVR6 STD FIPS 48TB; Form D 2U Rack Mnt; WS19 NA. Available in United States Only.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Video-Infrastructure-Devices-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FIPS-FORM-D-48TB-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 93,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FIPS-FORM-D-48TB-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-156",
    sku: "NVR6-STD-FIPS-FORM-D-64TB-NA",
    name: "NVR6-STD-FIPS-FORM-D-64TB-NA",
    slug: "nvr6-std-fips-form-d-64tb-na-nvr6-std-fips-form-d-64tb-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 65520,
    priceNGN: 65520 * 1500,
    description: "NVR6 STD FIPS 64TB; Form D 2U Rack Mnt; WS19 NA. Available in United States Only.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Video-Infrastructure-Devices-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FIPS-FORM-D-64TB-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 96,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FIPS-FORM-D-64TB-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-157",
    sku: "NVR6-STD-FORM-D-16TB-S22-AU",
    name: "NVR6-STD-FORM-D-16TB-S22-AU",
    slug: "nvr6-std-form-d-16tb-s22-au-nvr6-std-form-d-16tb-s22-au",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 39060,
    priceNGN: 39060 * 1500,
    description: "NVR6 STD FORM D 16TB 2U Rack Mnt; WS22; 5Y Onsite NBD; AU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FORM-D-16TB-S22-AU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 65,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FORM-D-16TB-S22-AU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-158",
    sku: "NVR6-STD-FORM-D-16TB-S22-EU",
    name: "NVR6-STD-FORM-D-16TB-S22-EU",
    slug: "nvr6-std-form-d-16tb-s22-eu-nvr6-std-form-d-16tb-s22-eu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 39060,
    priceNGN: 39060 * 1500,
    description: "NVR6 STD FORM D 16TB 2U Rack Mnt; WS22; 5Y Onsite NBD; EU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FORM-D-16TB-S22-EU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 47,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FORM-D-16TB-S22-EU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-159",
    sku: "NVR6-STD-FORM-D-16TB-S22-NA",
    name: "NVR6-STD-FORM-D-16TB-S22-NA",
    slug: "nvr6-std-form-d-16tb-s22-na-nvr6-std-form-d-16tb-s22-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 39060,
    priceNGN: 39060 * 1500,
    description: "NVR6 STD FORM D 16TB 2U Rack Mnt; WS22; 5Y Onsite NBD; NA",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FORM-D-16TB-S22-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 57,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FORM-D-16TB-S22-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-160",
    sku: "NVR6-STD-FORM-D-16TB-S22-UK",
    name: "NVR6-STD-FORM-D-16TB-S22-UK",
    slug: "nvr6-std-form-d-16tb-s22-uk-nvr6-std-form-d-16tb-s22-uk",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 39060,
    priceNGN: 39060 * 1500,
    description: "NVR6 STD FORM D 16TB 2U Rack Mnt; WS22; 5Y Onsite NBD; UK",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FORM-D-16TB-S22-UK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FORM-D-16TB-S22-UK Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-161",
    sku: "NVR6-STD-FORM-D-16TB-W10-AU",
    name: "NVR6-STD-FORM-D-16TB-W10-AU",
    slug: "nvr6-std-form-d-16tb-w10-au-nvr6-std-form-d-16tb-w10-au",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 37800,
    priceNGN: 37800 * 1500,
    description: "NVR6 STD FORM D 16TB 2U Rack Mnt; W10; 5Y Onsite NBD; AU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FORM-D-16TB-W10-AU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 73,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FORM-D-16TB-W10-AU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-162",
    sku: "NVR6-STD-FORM-D-16TB-W10-EU",
    name: "NVR6-STD-FORM-D-16TB-W10-EU",
    slug: "nvr6-std-form-d-16tb-w10-eu-nvr6-std-form-d-16tb-w10-eu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 37800,
    priceNGN: 37800 * 1500,
    description: "NVR6 STD FORM D 16TB 2U Rack Mnt; W10; 5Y Onsite NBD; EU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FORM-D-16TB-W10-EU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 67,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FORM-D-16TB-W10-EU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-163",
    sku: "NVR6-STD-FORM-D-16TB-W10-NA",
    name: "NVR6-STD-FORM-D-16TB-W10-NA",
    slug: "nvr6-std-form-d-16tb-w10-na-nvr6-std-form-d-16tb-w10-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 37800,
    priceNGN: 37800 * 1500,
    description: "NVR6 STD FORM D 16TB 2U Rack Mnt; W10; 5Y Onsite NBD; NA",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FORM-D-16TB-W10-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 46,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FORM-D-16TB-W10-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-164",
    sku: "NVR6-STD-FORM-D-16TB-W10-UK",
    name: "NVR6-STD-FORM-D-16TB-W10-UK",
    slug: "nvr6-std-form-d-16tb-w10-uk-nvr6-std-form-d-16tb-w10-uk",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 37800,
    priceNGN: 37800 * 1500,
    description: "NVR6 STD FORM D 16TB 2U Rack Mnt; W10; 5Y Onsite NBD; UK",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FORM-D-16TB-W10-UK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FORM-D-16TB-W10-UK Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-165",
    sku: "NVR6-STD-FORM-D-24TB-S22-AU",
    name: "NVR6-STD-FORM-D-24TB-S22-AU",
    slug: "nvr6-std-form-d-24tb-s22-au-nvr6-std-form-d-24tb-s22-au",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 43848,
    priceNGN: 43848 * 1500,
    description: "NVR6 STD FORM D 24TB 2U Rack Mnt; WS22; 5Y Onsite NBD; AU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FORM-D-24TB-S22-AU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 93,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FORM-D-24TB-S22-AU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-166",
    sku: "NVR6-STD-FORM-D-24TB-S22-EU",
    name: "NVR6-STD-FORM-D-24TB-S22-EU",
    slug: "nvr6-std-form-d-24tb-s22-eu-nvr6-std-form-d-24tb-s22-eu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 43848,
    priceNGN: 43848 * 1500,
    description: "NVR6 STD FORM D 24TB 2U Rack Mnt; WS22; 5Y Onsite NBD; EU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FORM-D-24TB-S22-EU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 96,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FORM-D-24TB-S22-EU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-167",
    sku: "NVR6-STD-FORM-D-24TB-S22-NA",
    name: "NVR6-STD-FORM-D-24TB-S22-NA",
    slug: "nvr6-std-form-d-24tb-s22-na-nvr6-std-form-d-24tb-s22-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 43848,
    priceNGN: 43848 * 1500,
    description: "NVR6 STD FORM D 24TB 2U Rack Mnt; WS22; 5Y Onsite NBD; NA",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FORM-D-24TB-S22-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 65,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FORM-D-24TB-S22-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-168",
    sku: "NVR6-STD-FORM-D-24TB-S22-UK",
    name: "NVR6-STD-FORM-D-24TB-S22-UK",
    slug: "nvr6-std-form-d-24tb-s22-uk-nvr6-std-form-d-24tb-s22-uk",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 43848,
    priceNGN: 43848 * 1500,
    description: "NVR6 STD FORM D 24TB 2U Rack Mnt; WS22; 5Y Onsite NBD; UK",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FORM-D-24TB-S22-UK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 47,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FORM-D-24TB-S22-UK Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-169",
    sku: "NVR6-STD-FORM-D-24TB-W10-AU",
    name: "NVR6-STD-FORM-D-24TB-W10-AU",
    slug: "nvr6-std-form-d-24tb-w10-au-nvr6-std-form-d-24tb-w10-au",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 42588,
    priceNGN: 42588 * 1500,
    description: "NVR6 STD FORM D 24TB 2U Rack Mnt; W10; 5Y Onsite NBD; AU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FORM-D-24TB-W10-AU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 57,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FORM-D-24TB-W10-AU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-170",
    sku: "NVR6-STD-FORM-D-24TB-W10-EU",
    name: "NVR6-STD-FORM-D-24TB-W10-EU",
    slug: "nvr6-std-form-d-24tb-w10-eu-nvr6-std-form-d-24tb-w10-eu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 42588,
    priceNGN: 42588 * 1500,
    description: "NVR6 STD FORM D 24TB 2U Rack Mnt; W10; 5Y Onsite NBD; EU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FORM-D-24TB-W10-EU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FORM-D-24TB-W10-EU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-171",
    sku: "NVR6-STD-FORM-D-24TB-W10-NA",
    name: "NVR6-STD-FORM-D-24TB-W10-NA",
    slug: "nvr6-std-form-d-24tb-w10-na-nvr6-std-form-d-24tb-w10-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 42588,
    priceNGN: 42588 * 1500,
    description: "NVR6 STD FORM D 24TB 2U Rack Mnt; W10; 5Y Onsite NBD; NA",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FORM-D-24TB-W10-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 73,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FORM-D-24TB-W10-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-172",
    sku: "NVR6-STD-FORM-D-24TB-W10-UK",
    name: "NVR6-STD-FORM-D-24TB-W10-UK",
    slug: "nvr6-std-form-d-24tb-w10-uk-nvr6-std-form-d-24tb-w10-uk",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 42588,
    priceNGN: 42588 * 1500,
    description: "NVR6 STD FORM D 24TB 2U Rack Mnt; W10; 5Y Onsite NBD; UK",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FORM-D-24TB-W10-UK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 67,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FORM-D-24TB-W10-UK Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-173",
    sku: "NVR6-STD-FORM-D-32TB-S22-AU",
    name: "NVR6-STD-FORM-D-32TB-S22-AU",
    slug: "nvr6-std-form-d-32tb-s22-au-nvr6-std-form-d-32tb-s22-au",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 47124,
    priceNGN: 47124 * 1500,
    description: "NVR6 STD FORM D 32TB 2U Rack Mnt; WS22; 5Y Onsite NBD; AU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FORM-D-32TB-S22-AU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 46,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FORM-D-32TB-S22-AU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-174",
    sku: "NVR6-STD-FORM-D-32TB-S22-EU",
    name: "NVR6-STD-FORM-D-32TB-S22-EU",
    slug: "nvr6-std-form-d-32tb-s22-eu-nvr6-std-form-d-32tb-s22-eu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 47124,
    priceNGN: 47124 * 1500,
    description: "NVR6 STD FORM D 32TB 2U Rack Mnt; WS22; 5Y Onsite NBD; EU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FORM-D-32TB-S22-EU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FORM-D-32TB-S22-EU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-175",
    sku: "NVR6-STD-FORM-D-32TB-S22-NA",
    name: "NVR6-STD-FORM-D-32TB-S22-NA",
    slug: "nvr6-std-form-d-32tb-s22-na-nvr6-std-form-d-32tb-s22-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 47124,
    priceNGN: 47124 * 1500,
    description: "NVR6 STD FORM D 32TB 2U Rack Mnt; WS22; 5Y Onsite NBD; NA",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FORM-D-32TB-S22-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 93,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FORM-D-32TB-S22-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-176",
    sku: "NVR6-STD-FORM-D-32TB-S22-UK",
    name: "NVR6-STD-FORM-D-32TB-S22-UK",
    slug: "nvr6-std-form-d-32tb-s22-uk-nvr6-std-form-d-32tb-s22-uk",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 47124,
    priceNGN: 47124 * 1500,
    description: "NVR6 STD FORM D 32TB 2U Rack Mnt; WS22; 5Y Onsite NBD; UK",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FORM-D-32TB-S22-UK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 96,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FORM-D-32TB-S22-UK Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-177",
    sku: "NVR6-STD-FORM-D-32TB-W10-AU",
    name: "NVR6-STD-FORM-D-32TB-W10-AU",
    slug: "nvr6-std-form-d-32tb-w10-au-nvr6-std-form-d-32tb-w10-au",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 45864,
    priceNGN: 45864 * 1500,
    description: "NVR6 STD FORM D 32TB 2U Rack Mnt; W10; 5Y Onsite NBD; AU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FORM-D-32TB-W10-AU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 65,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FORM-D-32TB-W10-AU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-178",
    sku: "NVR6-STD-FORM-D-32TB-W10-EU",
    name: "NVR6-STD-FORM-D-32TB-W10-EU",
    slug: "nvr6-std-form-d-32tb-w10-eu-nvr6-std-form-d-32tb-w10-eu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 45864,
    priceNGN: 45864 * 1500,
    description: "NVR6 STD FORM D 32TB 2U Rack Mnt; W10; 5Y Onsite NBD; EU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FORM-D-32TB-W10-EU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 47,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FORM-D-32TB-W10-EU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-179",
    sku: "NVR6-STD-FORM-D-32TB-W10-NA",
    name: "NVR6-STD-FORM-D-32TB-W10-NA",
    slug: "nvr6-std-form-d-32tb-w10-na-nvr6-std-form-d-32tb-w10-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 45864,
    priceNGN: 45864 * 1500,
    description: "NVR6 STD FORM D 32TB 2U Rack Mnt; W10; 5Y Onsite NBD; NA",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FORM-D-32TB-W10-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 57,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FORM-D-32TB-W10-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-180",
    sku: "NVR6-STD-FORM-D-32TB-W10-UK",
    name: "NVR6-STD-FORM-D-32TB-W10-UK",
    slug: "nvr6-std-form-d-32tb-w10-uk-nvr6-std-form-d-32tb-w10-uk",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 45864,
    priceNGN: 45864 * 1500,
    description: "NVR6 STD FORM D 32TB 2U Rack Mnt; W10; 5Y Onsite NBD; UK",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FORM-D-32TB-W10-UK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FORM-D-32TB-W10-UK Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-181",
    sku: "NVR6-STD-FORM-D-48TB-S22-AU",
    name: "NVR6-STD-FORM-D-48TB-S22-AU",
    slug: "nvr6-std-form-d-48tb-s22-au-nvr6-std-form-d-48tb-s22-au",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 53802,
    priceNGN: 53802 * 1500,
    description: "NVR6 STD FORM D 48TB 2U Rack Mnt; WS22; 5Y Onsite NBD; AU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FORM-D-48TB-S22-AU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 73,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FORM-D-48TB-S22-AU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-182",
    sku: "NVR6-STD-FORM-D-48TB-S22-EU",
    name: "NVR6-STD-FORM-D-48TB-S22-EU",
    slug: "nvr6-std-form-d-48tb-s22-eu-nvr6-std-form-d-48tb-s22-eu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 53802,
    priceNGN: 53802 * 1500,
    description: "NVR6 STD FORM D 48TB 2U Rack Mnt; WS22; 5Y Onsite NBD; EU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FORM-D-48TB-S22-EU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 67,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FORM-D-48TB-S22-EU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-183",
    sku: "NVR6-STD-FORM-D-48TB-S22-NA",
    name: "NVR6-STD-FORM-D-48TB-S22-NA",
    slug: "nvr6-std-form-d-48tb-s22-na-nvr6-std-form-d-48tb-s22-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 53802,
    priceNGN: 53802 * 1500,
    description: "NVR6 STD FORM D 48TB 2U Rack Mnt; WS22; 5Y Onsite NBD; NA",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FORM-D-48TB-S22-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 46,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FORM-D-48TB-S22-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-184",
    sku: "NVR6-STD-FORM-D-48TB-S22-UK",
    name: "NVR6-STD-FORM-D-48TB-S22-UK",
    slug: "nvr6-std-form-d-48tb-s22-uk-nvr6-std-form-d-48tb-s22-uk",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 53802,
    priceNGN: 53802 * 1500,
    description: "NVR6 STD FORM D 48TB 2U Rack Mnt; WS22; 5Y Onsite NBD; UK",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FORM-D-48TB-S22-UK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FORM-D-48TB-S22-UK Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-185",
    sku: "NVR6-STD-FORM-D-48TB-W10-AU",
    name: "NVR6-STD-FORM-D-48TB-W10-AU",
    slug: "nvr6-std-form-d-48tb-w10-au-nvr6-std-form-d-48tb-w10-au",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 52542,
    priceNGN: 52542 * 1500,
    description: "NVR6 STD FORM D 48TB 2U Rack Mnt; W10; 5Y Onsite NBD; AU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FORM-D-48TB-W10-AU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 93,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FORM-D-48TB-W10-AU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-186",
    sku: "NVR6-STD-FORM-D-48TB-W10-EU",
    name: "NVR6-STD-FORM-D-48TB-W10-EU",
    slug: "nvr6-std-form-d-48tb-w10-eu-nvr6-std-form-d-48tb-w10-eu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 52542,
    priceNGN: 52542 * 1500,
    description: "NVR6 STD FORM D 48TB 2U Rack Mnt; W10; 5Y Onsite NBD; EU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FORM-D-48TB-W10-EU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 96,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FORM-D-48TB-W10-EU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-187",
    sku: "NVR6-STD-FORM-D-48TB-W10-NA",
    name: "NVR6-STD-FORM-D-48TB-W10-NA",
    slug: "nvr6-std-form-d-48tb-w10-na-nvr6-std-form-d-48tb-w10-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 52542,
    priceNGN: 52542 * 1500,
    description: "NVR6 STD FORM D 48TB 2U Rack Mnt; W10; 5Y Onsite NBD; NA",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FORM-D-48TB-W10-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 65,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FORM-D-48TB-W10-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-188",
    sku: "NVR6-STD-FORM-D-48TB-W10-UK",
    name: "NVR6-STD-FORM-D-48TB-W10-UK",
    slug: "nvr6-std-form-d-48tb-w10-uk-nvr6-std-form-d-48tb-w10-uk",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 52542,
    priceNGN: 52542 * 1500,
    description: "NVR6 STD FORM D 48TB 2U Rack Mnt; W10; 5Y Onsite NBD; UK",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FORM-D-48TB-W10-UK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 47,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FORM-D-48TB-W10-UK Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-189",
    sku: "NVR6-STD-FORM-D-64TB-S22-AU",
    name: "NVR6-STD-FORM-D-64TB-S22-AU",
    slug: "nvr6-std-form-d-64tb-s22-au-nvr6-std-form-d-64tb-s22-au",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 59598,
    priceNGN: 59598 * 1500,
    description: "NVR6 STD FORM D 64TB 2U Rack Mnt; WS22; 5Y Onsite NBD; AU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FORM-D-64TB-S22-AU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 57,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FORM-D-64TB-S22-AU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-190",
    sku: "NVR6-STD-FORM-D-64TB-S22-EU",
    name: "NVR6-STD-FORM-D-64TB-S22-EU",
    slug: "nvr6-std-form-d-64tb-s22-eu-nvr6-std-form-d-64tb-s22-eu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 59598,
    priceNGN: 59598 * 1500,
    description: "NVR6 STD FORM D 64TB 2U Rack Mnt; WS22; 5Y Onsite NBD; EU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FORM-D-64TB-S22-EU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FORM-D-64TB-S22-EU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-191",
    sku: "NVR6-STD-FORM-D-64TB-S22-UK",
    name: "NVR6-STD-FORM-D-64TB-S22-UK",
    slug: "nvr6-std-form-d-64tb-s22-uk-nvr6-std-form-d-64tb-s22-uk",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 59598,
    priceNGN: 59598 * 1500,
    description: "NVR6 STD FORM D 64TB 2U Rack Mnt; WS22; 5Y Onsite NBD; UK",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FORM-D-64TB-S22-UK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 65,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FORM-D-64TB-S22-UK Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-192",
    sku: "NVR6-STD-FORM-D-64TB-W10-AU",
    name: "NVR6-STD-FORM-D-64TB-W10-AU",
    slug: "nvr6-std-form-d-64tb-w10-au-nvr6-std-form-d-64tb-w10-au",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 58338,
    priceNGN: 58338 * 1500,
    description: "NVR6 STD FORM D 64TB 2U Rack Mnt; W10; 5Y Onsite NBD; AU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FORM-D-64TB-W10-AU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 47,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FORM-D-64TB-W10-AU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-193",
    sku: "NVR6-STD-FORM-D-64TB-W10-EU",
    name: "NVR6-STD-FORM-D-64TB-W10-EU",
    slug: "nvr6-std-form-d-64tb-w10-eu-nvr6-std-form-d-64tb-w10-eu",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 58338,
    priceNGN: 58338 * 1500,
    description: "NVR6 STD FORM D 64TB 2U Rack Mnt; W10; 5Y Onsite NBD; EU",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FORM-D-64TB-W10-EU" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 57,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FORM-D-64TB-W10-EU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-194",
    sku: "NVR6-STD-FORM-D-64TB-W10-NA",
    name: "NVR6-STD-FORM-D-64TB-W10-NA",
    slug: "nvr6-std-form-d-64tb-w10-na-nvr6-std-form-d-64tb-w10-na",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 58338,
    priceNGN: 58338 * 1500,
    description: "NVR6 STD FORM D 64TB 2U Rack Mnt; W10; 5Y Onsite NBD; NA",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FORM-D-64TB-W10-NA" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FORM-D-64TB-W10-NA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-195",
    sku: "NVR6-STD-FORM-D-64TB-W10-UK",
    name: "NVR6-STD-FORM-D-64TB-W10-UK",
    slug: "nvr6-std-form-d-64tb-w10-uk-nvr6-std-form-d-64tb-w10-uk",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 58338,
    priceNGN: 58338 * 1500,
    description: "NVR6 STD; FORM D; 64TB; W10 UK",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/NVR6/NVR6%20Premium.png"],
    specifications: [
      { label: "SKU", value: "NVR6-STD-FORM-D-64TB-W10-UK" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 57,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "NVR6-STD-FORM-D-64TB-W10-UK Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-nvr-196",
    sku: "AVA-HDD1-263TB",
    name: "Expansion Disk Pack (263TB); AVA",
    slug: "expansion-disk-pack-263tb-ava-ava-hdd1-263tb",
    brand: "Avigilon",
    category: "Electrical Systems",
    subcategory: "Network Video Recorders",
    priceUSD: 80507.9,
    priceNGN: 80507.9 * 1500,
    description: "263TB Expansion Disk Pack for Avigilon Video Archive",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Video-Infrastructure-Devices-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "AVA-HDD1-263TB" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electrical Systems" },
      { label: "Subcategory", value: "Network Video Recorders" }
    ],
    stock: 84,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Expansion Disk Pack (263TB); AVA Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  }
];

export const CAMERA_BUNDLE_PRODUCTS: Product[] = [
  {
    id: "sp-bundle-1",
    sku: "AC-USB-DOCK-050",
    name: "USB Cable for Body-worn cameras",
    slug: "usb-cable-for-body-worn-cameras-ac-usb-dock-050",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 30,
    priceNGN: 30 * 1500,
    description: "USB Cable for Body-worn cameras",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/AC-USB-DOCK-200_071320.jpg"],
    specifications: [
      { label: "SKU", value: "AC-USB-DOCK-050" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 102,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "USB Cable for Body-worn cameras Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-2",
    sku: "AC-USB-DOCK-200",
    name: "USB Cable for Body-worn cameras",
    slug: "usb-cable-for-body-worn-cameras-ac-usb-dock-200",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 30,
    priceNGN: 30 * 1500,
    description: "USB Cable for Body-worn cameras",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/AC-USB-DOCK-200_071320.jpg"],
    specifications: [
      { label: "SKU", value: "AC-USB-DOCK-200" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 122,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "USB Cable for Body-worn cameras Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-3",
    sku: "AC-USB-MICROB-100",
    name: "USB Cable for Body-worn cameras",
    slug: "usb-cable-for-body-worn-cameras-ac-usb-microb-100",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 36,
    priceNGN: 36 * 1500,
    description: "USB Cable for Body-worn cameras",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/AC-USB-MICROB-100_071320.jpg"],
    specifications: [
      { label: "SKU", value: "AC-USB-MICROB-100" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 115,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "USB Cable for Body-worn cameras Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-4",
    sku: "KF-CLAMPMOUNT",
    name: "KF-CLAMPMOUNT",
    slug: "kf-clampmount-kf-clampmount",
    brand: "Klick Fast",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 70.8,
    priceNGN: 70.8 * 1500,
    description: "Klick Fast clamp mount",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/KF-CLAMPMOUNT%282%29%20%281%29.jpg"],
    specifications: [
      { label: "SKU", value: "KF-CLAMPMOUNT" },
      { label: "Brand", value: "Klick Fast" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 105,
    oem: "Klick Fast",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "KF-CLAMPMOUNT Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-5",
    sku: "KF-DOCK05BVELCRO",
    name: "KF-DOCK05BVELCRO",
    slug: "kf-dock05bvelcro-kf-dock05bvelcro",
    brand: "Klick Fast",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 30,
    priceNGN: 30 * 1500,
    description: "Klick Fast Belt Loop",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/KF-DOCK05BVELCRO-1290x1290-08242022.png"],
    specifications: [
      { label: "SKU", value: "KF-DOCK05BVELCRO" },
      { label: "Brand", value: "Klick Fast" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 153,
    oem: "Klick Fast",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "KF-DOCK05BVELCRO Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-6",
    sku: "KF-DOCKBUTTONF",
    name: "KF-DOCKBUTTONF",
    slug: "kf-dockbuttonf-kf-dockbuttonf",
    brand: "Klick Fast",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 24,
    priceNGN: 24 * 1500,
    description: "Klick Fast Button Dock Female",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/KF-DOCKBUTTONF-1290x1290-08242022.png"],
    specifications: [
      { label: "SKU", value: "KF-DOCKBUTTONF" },
      { label: "Brand", value: "Klick Fast" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 163,
    oem: "Klick Fast",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "KF-DOCKBUTTONF Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-7",
    sku: "KF-DOCKBUTTONM",
    name: "KF-DOCKBUTTONM",
    slug: "kf-dockbuttonm-kf-dockbuttonm",
    brand: "Klick Fast",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 24,
    priceNGN: 24 * 1500,
    description: "Klick Fast Button Dock Male",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/KF-DOCKBUTTONM-1290x1290-08242022.png"],
    specifications: [
      { label: "SKU", value: "KF-DOCKBUTTONM" },
      { label: "Brand", value: "Klick Fast" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 136,
    oem: "Klick Fast",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "KF-DOCKBUTTONM Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-8",
    sku: "KF-DOCKCLAMP",
    name: "Klick Fast Dock Clamp",
    slug: "klick-fast-dock-clamp-kf-dockclamp",
    brand: "Klick Fast",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 42,
    priceNGN: 42 * 1500,
    description: "Klick Fast Dock Clamp (pocket klick fast dock). For use with body worn cameras.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/KF-DOCKCLAMP_070520.jpg"],
    specifications: [
      { label: "SKU", value: "KF-DOCKCLAMP" },
      { label: "Brand", value: "Klick Fast" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 132,
    oem: "Klick Fast",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Klick Fast Dock Clamp Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-9",
    sku: "KF-DOCKCROCCLAT",
    name: "KF-DOCKCROCCLAT",
    slug: "kf-dockcrocclat-kf-dockcrocclat",
    brand: "Klick Fast",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 36,
    priceNGN: 36 * 1500,
    description: "Klick Fast Crocodile clip with Anti-Tilt Attachment",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/KF-DOCKCROCCLAT-1290x1290-08242022.png"],
    specifications: [
      { label: "SKU", value: "KF-DOCKCROCCLAT" },
      { label: "Brand", value: "Klick Fast" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 184,
    oem: "Klick Fast",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "KF-DOCKCROCCLAT Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-10",
    sku: "KF-DOCKCROCCLIP",
    name: "KF-DOCKCROCCLIP",
    slug: "kf-dockcrocclip-kf-dockcrocclip",
    brand: "Klick Fast",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 30,
    priceNGN: 30 * 1500,
    description: "Klick Fast crocodile clip",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/KF-DOCKCROCCLIP-1290x1290-08242022.png"],
    specifications: [
      { label: "SKU", value: "KF-DOCKCROCCLIP" },
      { label: "Brand", value: "Klick Fast" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 118,
    oem: "Klick Fast",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "KF-DOCKCROCCLIP Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-11",
    sku: "KF-DOCKEP",
    name: "Klick Fast Epaulette Dock",
    slug: "klick-fast-epaulette-dock-kf-dockep",
    brand: "Klick Fast",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 30,
    priceNGN: 30 * 1500,
    description: "Klick Fast Dock Epaulette (epaullette klickfast dock)",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/KF-DOCKEP-12102020.jpg"],
    specifications: [
      { label: "SKU", value: "KF-DOCKEP" },
      { label: "Brand", value: "Klick Fast" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 157,
    oem: "Klick Fast",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Klick Fast Epaulette Dock Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-12",
    sku: "KF-DOCKRUCKSACK",
    name: "KF-DOCKRUCKSACK",
    slug: "kf-dockrucksack-kf-dockrucksack",
    brand: "Klick Fast",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 24,
    priceNGN: 24 * 1500,
    description: "Klick Fast Rucksack Dock",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/KF-DOCKRUCKSACK-1290x1290-08242022.png"],
    specifications: [
      { label: "SKU", value: "KF-DOCKRUCKSACK" },
      { label: "Brand", value: "Klick Fast" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 178,
    oem: "Klick Fast",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "KF-DOCKRUCKSACK Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-13",
    sku: "KF-HARN3",
    name: "Klick Fast 3-Point Chest Harness",
    slug: "klick-fast-3-point-chest-harness-kf-harn3",
    brand: "Klick Fast",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 72,
    priceNGN: 72 * 1500,
    description: "Klick Fast 3-point chest harness",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/KF-HARN3-12102020.jpg"],
    specifications: [
      { label: "SKU", value: "KF-HARN3" },
      { label: "Brand", value: "Klick Fast" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 112,
    oem: "Klick Fast",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Klick Fast 3-Point Chest Harness Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-14",
    sku: "KF-HARN4",
    name: "Klick Fast 4-Point Chest Harness",
    slug: "klick-fast-4-point-chest-harness-kf-harn4",
    brand: "Klick Fast",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 72,
    priceNGN: 72 * 1500,
    description: "Klick Fast 4-point chest harness",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Klick-Fast-4Point-Chest-Harness-12102020.jpg"],
    specifications: [
      { label: "SKU", value: "KF-HARN4" },
      { label: "Brand", value: "Klick Fast" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 146,
    oem: "Klick Fast",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Klick Fast 4-Point Chest Harness Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-15",
    sku: "KF-QUADMOLLE",
    name: "KF-QUADMOLLE",
    slug: "kf-quadmolle-kf-quadmolle",
    brand: "Klick Fast",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 30,
    priceNGN: 30 * 1500,
    description: "Klick Fast Quad MOLLE Dock",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/KF-QUADMOLLE.png"],
    specifications: [
      { label: "SKU", value: "KF-QUADMOLLE" },
      { label: "Brand", value: "Klick Fast" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 127,
    oem: "Klick Fast",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "KF-QUADMOLLE Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-16",
    sku: "KF-SCREW",
    name: "Klick Fast Screw-on Dock",
    slug: "klick-fast-screw-on-dock-kf-screw",
    brand: "Klick Fast",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 30,
    priceNGN: 30 * 1500,
    description: "Klick Fast uniform screw-on dock. For use with body worn cameras.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/KF-SCREW_070520.jpg"],
    specifications: [
      { label: "SKU", value: "KF-SCREW" },
      { label: "Brand", value: "Klick Fast" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 74,
    oem: "Klick Fast",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Klick Fast Screw-on Dock Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-17",
    sku: "VB-YA-HA-100",
    name: "VB-YA-HA-100",
    slug: "vb-ya-ha-100-vb-ya-ha-100",
    brand: "Motorola Solutions",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 49500,
    priceNGN: 49500 * 1500,
    description: "Holster Aware sensor fixing kit 100-off",
    images: ["https://i.ibb.co/sL4S0FX/images-19.jpg"],
    specifications: [
      { label: "SKU", value: "VB-YA-HA-100" },
      { label: "Brand", value: "Motorola Solutions" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 135,
    oem: "Motorola Solutions",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "VB-YA-HA-100 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-18",
    sku: "VB-YA-HA-1000",
    name: "VB-YA-HA-1000",
    slug: "vb-ya-ha-1000-vb-ya-ha-1000",
    brand: "Motorola Solutions",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 399000,
    priceNGN: 399000 * 1500,
    description: "Holster Aware sensor fixing kit 1000-off",
    images: ["https://i.ibb.co/rRTm6DXM/images-17.jpg"],
    specifications: [
      { label: "SKU", value: "VB-YA-HA-1000" },
      { label: "Brand", value: "Motorola Solutions" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 74,
    oem: "Motorola Solutions",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "VB-YA-HA-1000 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-19",
    sku: "VB-YA-HA-PRIMER",
    name: "VB-YA-HA-PRIMER",
    slug: "vb-ya-ha-primer-vb-ya-ha-primer",
    brand: "Motorola Solutions",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 48,
    priceNGN: 48 * 1500,
    description: "Spare fixing primer for Holster Aware",
    images: ["https://i.ibb.co/XGCh33x/images-24.jpg"],
    specifications: [
      { label: "SKU", value: "VB-YA-HA-PRIMER" },
      { label: "Brand", value: "Motorola Solutions" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 183,
    oem: "Motorola Solutions",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "VB-YA-HA-PRIMER Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-20",
    sku: "DC-200-AUS",
    name: "DockController (AUS)",
    slug: "dockcontroller-aus-dc-200-aus",
    brand: "Motorola Solutions",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 864,
    priceNGN: 864 * 1500,
    description: "DockController DC-200; PSU; AUS power & LAN cable. Available only for EU; EFTA; US; Australia; New Zealand and Canada. For use with",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/DC-200_070520.jpg"],
    specifications: [
      { label: "SKU", value: "DC-200-AUS" },
      { label: "Brand", value: "Motorola Solutions" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 125,
    oem: "Motorola Solutions",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "DockController (AUS) Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-21",
    sku: "DC-200-EU",
    name: "DockController (EU)",
    slug: "dockcontroller-eu-dc-200-eu",
    brand: "Motorola Solutions",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 864,
    priceNGN: 864 * 1500,
    description: "DockController DC-200; PSU; EU power & LAN cable. Available only for EU; EFTA; US; Australia; New Zealand and Canada. For use with body worn cameras.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/DC-200_070520.jpg"],
    specifications: [
      { label: "SKU", value: "DC-200-EU" },
      { label: "Brand", value: "Motorola Solutions" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 122,
    oem: "Motorola Solutions",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "DockController (EU) Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-22",
    sku: "DC-200-ROW",
    name: "DockController (ROW)",
    slug: "dockcontroller-row-dc-200-row",
    brand: "Motorola Solutions",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 864,
    priceNGN: 864 * 1500,
    description: "DockController DC-200; PSU; LAN cable; no power cable. Available only for EU; EFTA; US; Australia; New Zealand and Canada. For use with body worn cameras.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/DC-200_070520.jpg"],
    specifications: [
      { label: "SKU", value: "DC-200-ROW" },
      { label: "Brand", value: "Motorola Solutions" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 183,
    oem: "Motorola Solutions",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "DockController (ROW) Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-23",
    sku: "VB-400-12MW-N",
    name: "12 Month Additional Warranty for VB-400 Body-worn camera",
    slug: "12-month-additional-warranty-for-vb-400-body-worn-camera-vb-400-12mw-n",
    brand: "Motorola Solutions",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 174,
    priceNGN: 174 * 1500,
    description: "12 Month Additional Warranty for VB-400 Body-worn camera",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Body-Worn-Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "VB-400-12MW-N" },
      { label: "Brand", value: "Motorola Solutions" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 88,
    oem: "Motorola Solutions",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "12 Month Additional Warranty for VB-400 Body-worn camera Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-24",
    sku: "VB-400-24MW-N",
    name: "24 Month Additional Warranty for VB-400 Body-worn camera",
    slug: "24-month-additional-warranty-for-vb-400-body-worn-camera-vb-400-24mw-n",
    brand: "Motorola Solutions",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 300,
    priceNGN: 300 * 1500,
    description: "24 Month Additional Warranty for VB-400 Body-worn camera",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Body-Worn-Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "VB-400-24MW-N" },
      { label: "Brand", value: "Motorola Solutions" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 91,
    oem: "Motorola Solutions",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "24 Month Additional Warranty for VB-400 Body-worn camera Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-25",
    sku: "VB-400-DOCK-SOLO",
    name: "VB400 1-Port Dock",
    slug: "vb400-1-port-dock-vb-400-dock-solo",
    brand: "Motorola Solutions",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 102,
    priceNGN: 102 * 1500,
    description: "VB400 1-Port Dock",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/VB400-1-Port%20Dock-500x500.jpg"],
    specifications: [
      { label: "SKU", value: "VB-400-DOCK-SOLO" },
      { label: "Brand", value: "Motorola Solutions" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 173,
    oem: "Motorola Solutions",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "VB400 1-Port Dock Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-26",
    sku: "VB-400-DOCK14/AUS",
    name: "VB400 14-Port Dock (AUS)",
    slug: "vb400-14-port-dock-aus-vb-400-dock14aus",
    brand: "Motorola Solutions",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 960,
    priceNGN: 960 * 1500,
    description: "VB400 14-Port Dock with AUS power cable",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/VB400-14-Port%20Dock-500x500.jpg"],
    specifications: [
      { label: "SKU", value: "VB-400-DOCK14/AUS" },
      { label: "Brand", value: "Motorola Solutions" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 149,
    oem: "Motorola Solutions",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "VB400 14-Port Dock (AUS) Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-27",
    sku: "VB-400-DOCK14/EU",
    name: "VB400 14-Port Dock (EU)",
    slug: "vb400-14-port-dock-eu-vb-400-dock14eu",
    brand: "Motorola Solutions",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 960,
    priceNGN: 960 * 1500,
    description: "VB400 14-Port Dock with EU power cable",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/VB400-14-Port%20Dock-500x500.jpg"],
    specifications: [
      { label: "SKU", value: "VB-400-DOCK14/EU" },
      { label: "Brand", value: "Motorola Solutions" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 127,
    oem: "Motorola Solutions",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "VB400 14-Port Dock (EU) Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-28",
    sku: "VB-400-DOCK14/ROW",
    name: "VB400 14-Port Dock (ROW)",
    slug: "vb400-14-port-dock-row-vb-400-dock14row",
    brand: "Motorola Solutions",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 960,
    priceNGN: 960 * 1500,
    description: "VB400 14-Port Dock with no power cable",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/VB400-14-Port%20Dock-500x500.jpg"],
    specifications: [
      { label: "SKU", value: "VB-400-DOCK14/ROW" },
      { label: "Brand", value: "Motorola Solutions" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 140,
    oem: "Motorola Solutions",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "VB400 14-Port Dock (ROW) Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-29",
    sku: "VB-400-DOCK14/UK",
    name: "VB400 14-Port Dock (UK)",
    slug: "vb400-14-port-dock-uk-vb-400-dock14uk",
    brand: "Motorola Solutions",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 960,
    priceNGN: 960 * 1500,
    description: "VB400 14-Port Dock with UK power cable",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/VB400-14-Port%20Dock-500x500.jpg"],
    specifications: [
      { label: "SKU", value: "VB-400-DOCK14/UK" },
      { label: "Brand", value: "Motorola Solutions" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 139,
    oem: "Motorola Solutions",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "VB400 14-Port Dock (UK) Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-30",
    sku: "DC-200-UK",
    name: "DockController (UK)",
    slug: "dockcontroller-uk-dc-200-uk",
    brand: "Motorola Solutions",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 864,
    priceNGN: 864 * 1500,
    description: "DockController DC-200; PSU; UK power & LAN cable. Available only for EU; EFTA; US; Australia; New Zealand and Canada. For use with body worn cameras.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/DC-200_070520.jpg"],
    specifications: [
      { label: "SKU", value: "DC-200-UK" },
      { label: "Brand", value: "Motorola Solutions" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 160,
    oem: "Motorola Solutions",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "DockController (UK) Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-31",
    sku: "VM-EPL-3PVMS",
    name: "VM-EPL-3PVMS",
    slug: "vm-epl-3pvms-vm-epl-3pvms",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 7500,
    priceNGN: 7500 * 1500,
    description: "3rd party VMS support for VideoManager",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Body-Worn-Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "VM-EPL-3PVMS" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 160,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "VM-EPL-3PVMS Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-32",
    sku: "VM-EPL-FIPS",
    name: "VM-EPL-FIPS",
    slug: "vm-epl-fips-vm-epl-fips",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 1200,
    priceNGN: 1200 * 1500,
    description: "VideoManager FIPS license",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Body-Worn-Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "VM-EPL-FIPS" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 75,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "VM-EPL-FIPS Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-33",
    sku: "VM-EPL-HQ-BASE",
    name: "VideoManager HQ Base License",
    slug: "videomanager-hq-base-license-vm-epl-hq-base",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 4500,
    priceNGN: 4500 * 1500,
    description: "VideoManager for Head-quarters - Base",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Body-Worn-Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "VM-EPL-HQ-BASE" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 141,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "VideoManager HQ Base License Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-34",
    sku: "VM-EPL-HQ-PRO",
    name: "VideoManager for Head-quarters - Pro",
    slug: "videomanager-for-head-quarters-pro-vm-epl-hq-pro",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 56400,
    priceNGN: 56400 * 1500,
    description: "VideoManager for Head-quarters - Pro",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Body-Worn-Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "VM-EPL-HQ-PRO" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 92,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "VideoManager for Head-quarters - Pro Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-35",
    sku: "VM-EPL-M-1-N",
    name: "VM-EPL-M-1-N",
    slug: "vm-epl-m-1-n-vm-epl-m-1-n",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 480,
    priceNGN: 480 * 1500,
    description: "Licence: 1x VideoManager for M series ICV",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "VM-EPL-M-1-N" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 165,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "VM-EPL-M-1-N Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-36",
    sku: "VM-EPL-STORE-1TB",
    name: "VM-EPL-STORE-1TB",
    slug: "vm-epl-store-1tb-vm-epl-store-1tb",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 960,
    priceNGN: 960 * 1500,
    description: "VideoManager object storage access license; 1TB",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "VM-EPL-STORE-1TB" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 78,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "VM-EPL-STORE-1TB Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-37",
    sku: "VM-EPL-VB-1-N",
    name: "VM-EPL-VB-1-N",
    slug: "vm-epl-vb-1-n-vm-epl-vb-1-n",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 480,
    priceNGN: 480 * 1500,
    description: "Licence: 1x VideoManager for VB camera",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Body-Worn-Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "VM-EPL-VB-1-N" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 92,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "VM-EPL-VB-1-N Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-38",
    sku: "VM-EPL-VB-CONNECT-1",
    name: "CONNECT License for VB400",
    slug: "connect-license-for-vb400-vm-epl-vb-connect-1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 390,
    priceNGN: 390 * 1500,
    description: "License: 1x VideoManager CONNECT license for VB400 body-worn camera",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Body-Worn-Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "VM-EPL-VB-CONNECT-1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 172,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "CONNECT License for VB400 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-39",
    sku: "VM-EPL-VB-CONNECT-TO-PLUS-1",
    name: "UPGRADE License for VB400",
    slug: "upgrade-license-for-vb400-vm-epl-vb-connect-to-plus-1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 150,
    priceNGN: 150 * 1500,
    description: "License: 1x VideoManager UPGRADE license for VB400 body-worn camera",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Body-Worn-Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "VM-EPL-VB-CONNECT-TO-PLUS-1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 126,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "UPGRADE License for VB400 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-40",
    sku: "VM-EPL-VB-PLUS-1",
    name: "PLUS License for VB400",
    slug: "plus-license-for-vb400-vm-epl-vb-plus-1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 498,
    priceNGN: 498 * 1500,
    description: "License: 1x VideoManager PLUS license for VB400 body-worn camera",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Body-Worn-Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "VM-EPL-VB-PLUS-1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 155,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "PLUS License for VB400 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-41",
    sku: "VM-EPL-VT-CONNECT-1",
    name: "CONNECT License for VT100",
    slug: "connect-license-for-vt100-vm-epl-vt-connect-1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 228,
    priceNGN: 228 * 1500,
    description: "Licence: 1x VM Connect for VT100",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Body-Worn-Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "VM-EPL-VT-CONNECT-1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 83,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "CONNECT License for VT100 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-42",
    sku: "VM-EPL-VT-CONNECT-TO-PLUS-1",
    name: "Upgrade License for VT100",
    slug: "upgrade-license-for-vt100-vm-epl-vt-connect-to-plus-1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 60,
    priceNGN: 60 * 1500,
    description: "Licence: 1x Upg. to VM Plus for VT100",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Body-Worn-Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "VM-EPL-VT-CONNECT-TO-PLUS-1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 165,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Upgrade License for VT100 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-43",
    sku: "VM-EPL-VT-PLUS-1",
    name: "PLUS License for VT100",
    slug: "plus-license-for-vt100-vm-epl-vt-plus-1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 270,
    priceNGN: 270 * 1500,
    description: "Licence: 1x VM Plus for VT100",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Body-Worn-Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "VM-EPL-VT-PLUS-1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 147,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "PLUS License for VT100 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-44",
    sku: "VM-ESA-3PVMS-12M",
    name: "VM-ESA-3PVMS-12M",
    slug: "vm-esa-3pvms-12m-vm-esa-3pvms-12m",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 1500,
    priceNGN: 1500 * 1500,
    description: "SW Assurance: +12 m for VideoManager 3rd-party VMS",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Body-Worn-Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "VM-ESA-3PVMS-12M" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 115,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "VM-ESA-3PVMS-12M Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-45",
    sku: "VM-ESA-3PVMS-24M",
    name: "VM-ESA-3PVMS-24M",
    slug: "vm-esa-3pvms-24m-vm-esa-3pvms-24m",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 2640,
    priceNGN: 2640 * 1500,
    description: "SW Assurance: +24 m for VideoManager 3rd-party VMS",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Body-Worn-Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "VM-ESA-3PVMS-24M" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 73,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "VM-ESA-3PVMS-24M Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-46",
    sku: "VM-ESA-FIPS-12M",
    name: "VM-ESA-FIPS-12M",
    slug: "vm-esa-fips-12m-vm-esa-fips-12m",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 240,
    priceNGN: 240 * 1500,
    description: "SW Assurance add 12 months for VM FIPS",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Body-Worn-Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "VM-ESA-FIPS-12M" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 162,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "VM-ESA-FIPS-12M Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-47",
    sku: "VM-ESA-FIPS-24M",
    name: "VM-ESA-FIPS-24M",
    slug: "vm-esa-fips-24m-vm-esa-fips-24m",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 444,
    priceNGN: 444 * 1500,
    description: "SW Assurance add 24 months for VM FIPS",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Body-Worn-Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "VM-ESA-FIPS-24M" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 164,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "VM-ESA-FIPS-24M Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-48",
    sku: "VM-ESA-HQ-BASE-12M",
    name: "VM-ESA-HQ-BASE-12M",
    slug: "vm-esa-hq-base-12m-vm-esa-hq-base-12m",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 960,
    priceNGN: 960 * 1500,
    description: "SW Assurance: +12 m for VideoManager HQ Base",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Body-Worn-Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "VM-ESA-HQ-BASE-12M" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 97,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "VM-ESA-HQ-BASE-12M Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-49",
    sku: "VM-ESA-HQ-BASE-24M",
    name: "VM-ESA-HQ-BASE-24M",
    slug: "vm-esa-hq-base-24m-vm-esa-hq-base-24m",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 1680,
    priceNGN: 1680 * 1500,
    description: "SW Assurance: +24 m for VideoManager HQ Base",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Body-Worn-Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "VM-ESA-HQ-BASE-24M" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 87,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "VM-ESA-HQ-BASE-24M Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-50",
    sku: "VM-ESA-HQ-BASE-48M",
    name: "VM-ESA-HQ-BASE-48M",
    slug: "vm-esa-hq-base-48m-vm-esa-hq-base-48m",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 2880,
    priceNGN: 2880 * 1500,
    description: "SW Assurance add 48 months for HQ Base",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Body-Worn-Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "VM-ESA-HQ-BASE-48M" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 115,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "VM-ESA-HQ-BASE-48M Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-51",
    sku: "VM-ESA-HQ-PRO-12M",
    name: "SW Assurance: +12m VideoManager HQ Pro",
    slug: "sw-assurance-12m-videomanager-hq-pro-vm-esa-hq-pro-12m",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 11280,
    priceNGN: 11280 * 1500,
    description: "SW Assurance: +12 m VideoManager HQ Pro",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Body-Worn-Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "VM-ESA-HQ-PRO-12M" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 119,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "SW Assurance: +12m VideoManager HQ Pro Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-52",
    sku: "VM-ESA-HQ-PRO-24M",
    name: "SW Assurance: +24m VideoManager HQ Pro",
    slug: "sw-assurance-24m-videomanager-hq-pro-vm-esa-hq-pro-24m",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 19800,
    priceNGN: 19800 * 1500,
    description: "SW Assurance: +24 m VideoManager HQ Pro",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Body-Worn-Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "VM-ESA-HQ-PRO-24M" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 74,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "SW Assurance: +24m VideoManager HQ Pro Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-53",
    sku: "VM-ESA-MIDTIER-12M",
    name: "VM-ESA-MIDTIER-12M",
    slug: "vm-esa-midtier-12m-vm-esa-midtier-12m",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 1500,
    priceNGN: 1500 * 1500,
    description: "SW Assurance: +12 m for VM-EPL-MIDTIER",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Body-Worn-Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "VM-ESA-MIDTIER-12M" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 122,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "VM-ESA-MIDTIER-12M Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-54",
    sku: "VM-ESA-STORE1TB12M",
    name: "VM-ESA-STORE1TB12M",
    slug: "vm-esa-store1tb12m-vm-esa-store1tb12m",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 228,
    priceNGN: 228 * 1500,
    description: "SW Assurance: +12 m for VideoManager ObjectStorage 1Tb",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Body-Worn-Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "VM-ESA-STORE1TB12M" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 174,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "VM-ESA-STORE1TB12M Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-55",
    sku: "VM-ESA-VB-12M-1",
    name: "12 Month Additional S/W Assurance for VideoManager (VB400)",
    slug: "12-month-additional-sw-assurance-for-videomanager-vb400-vm-esa-vb-12m-1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 102,
    priceNGN: 102 * 1500,
    description: "Additional 12 months of Software Assurance for VideoManager (VB400)",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Body-Worn-Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "VM-ESA-VB-12M-1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 82,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "12 Month Additional S/W Assurance for VideoManager (VB400) Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-56",
    sku: "VM-ESA-VB-24M-1",
    name: "24 Month S/W Assurance for VideoManager",
    slug: "24-month-sw-assurance-for-videomanager-vm-esa-vb-24m-1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 174,
    priceNGN: 174 * 1500,
    description: "Software Assurance: +24 Months for 1x VM-EPL-VB license",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Body-Worn-Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "VM-ESA-VB-24M-1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 177,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "24 Month S/W Assurance for VideoManager Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-57",
    sku: "VM-ESA-VB-48M",
    name: "VM-ESA-VB-48M",
    slug: "vm-esa-vb-48m-vm-esa-vb-48m",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 294,
    priceNGN: 294 * 1500,
    description: "SW Assurance: add 48 months 1 VB licence",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Body-Worn-Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "VM-ESA-VB-48M" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 73,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "VM-ESA-VB-48M Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-58",
    sku: "VM-ESA-VT-12M-1",
    name: "12 Month S/W Assurance for VideoManager",
    slug: "12-month-sw-assurance-for-videomanager-vm-esa-vt-12m-1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 60,
    priceNGN: 60 * 1500,
    description: "SW Assurance: +12 mnths for 1x VM-EPL-VT",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Body-Worn-Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "VM-ESA-VT-12M-1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 152,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "12 Month S/W Assurance for VideoManager Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-59",
    sku: "VM-ESA-VT-24M-1",
    name: "24 Month S/W Assurance for VideoManager",
    slug: "24-month-sw-assurance-for-videomanager-vm-esa-vt-24m-1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 90,
    priceNGN: 90 * 1500,
    description: "Software Assurance: +24 Months for 1x VM-EPL-VT license",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Body-Worn-Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "VM-ESA-VT-24M-1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 101,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "24 Month S/W Assurance for VideoManager Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-60",
    sku: "VB-400-VF-MAG",
    name: "Close-Fit Magnetic Mount",
    slug: "close-fit-magnetic-mount-vb-400-vf-mag",
    brand: "Motorola Solutions",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 42,
    priceNGN: 42 * 1500,
    description: "Close-Fit Magnetic Mount for VB-440-64-VF-N",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/VB-400-VF-MAG-500x500.jpg"],
    specifications: [
      { label: "SKU", value: "VB-400-VF-MAG" },
      { label: "Brand", value: "Motorola Solutions" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 180,
    oem: "Motorola Solutions",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Close-Fit Magnetic Mount Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-61",
    sku: "VB-400-VF-MOL2",
    name: "Close-Fit Double MOLLE Mount",
    slug: "close-fit-double-molle-mount-vb-400-vf-mol2",
    brand: "Motorola Solutions",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 84,
    priceNGN: 84 * 1500,
    description: "Close-Fit Double MOLLE Mount for VB-440-64-VF-N",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/VB-400-VF-MOL2-500x500.jpg"],
    specifications: [
      { label: "SKU", value: "VB-400-VF-MOL2" },
      { label: "Brand", value: "Motorola Solutions" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 178,
    oem: "Motorola Solutions",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Close-Fit Double MOLLE Mount Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-62",
    sku: "VB-440-64-VF-N",
    name: "VB400 Close Fit Body-worn camera",
    slug: "vb400-close-fit-body-worn-camera-vb-440-64-vf-n",
    brand: "Motorola Solutions",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 854.78,
    priceNGN: 854.78 * 1500,
    description: "VB400 Close Fit Body-worn camera",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/VB400-Front-11172020.jpg"],
    specifications: [
      { label: "SKU", value: "VB-440-64-VF-N" },
      { label: "Brand", value: "Motorola Solutions" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 179,
    oem: "Motorola Solutions",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "VB400 Close Fit Body-worn camera Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-63",
    sku: "VB-440-64-KF-N",
    name: "VB400 Klick Fast Stud Body-worn camera",
    slug: "vb400-klick-fast-stud-body-worn-camera-vb-440-64-kf-n",
    brand: "Motorola Solutions",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 854.78,
    priceNGN: 854.78 * 1500,
    description: "VB400 Klick Fast Stud Body-worn camera",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/VB400-Front-11172020.jpg"],
    specifications: [
      { label: "SKU", value: "VB-440-64-KF-N" },
      { label: "Brand", value: "Motorola Solutions" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 82,
    oem: "Motorola Solutions",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "VB400 Klick Fast Stud Body-worn camera Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-64",
    sku: "V500-SD10-EU",
    name: "V500-SD10-EU",
    slug: "v500-sd10-eu-v500-sd10-eu",
    brand: "Motorola Solutions",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 1908,
    priceNGN: 1908 * 1500,
    description: "10 pocket V500 smart dock; PSU; EU power",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "V500-SD10-EU" },
      { label: "Brand", value: "Motorola Solutions" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 151,
    oem: "Motorola Solutions",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "V500-SD10-EU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-65",
    sku: "VM-ESA-V-24M-1",
    name: "VM-ESA-V-24M-1",
    slug: "vm-esa-v-24m-1-vm-esa-v-24m-1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 174,
    priceNGN: 174 * 1500,
    description: "SW Assurance 24 months for 1x V series licence",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "VM-ESA-V-24M-1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 94,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "VM-ESA-V-24M-1 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-66",
    sku: "VT-100-12MW-N",
    name: "12 Month Warranty for VT100",
    slug: "12-month-warranty-for-vt100-vt-100-12mw-n",
    brand: "Motorola Solutions",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 156,
    priceNGN: 156 * 1500,
    description: "Warranty: +12 mnths for 1x VT100",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Body-Worn-Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "VT-100-12MW-N" },
      { label: "Brand", value: "Motorola Solutions" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 168,
    oem: "Motorola Solutions",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "12 Month Warranty for VT100 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-67",
    sku: "VT-100-24MW-N",
    name: "24 Month Warranty for VT100",
    slug: "24-month-warranty-for-vt100-vt-100-24mw-n",
    brand: "Motorola Solutions",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 276,
    priceNGN: 276 * 1500,
    description: "Warranty: +24 months warranty for VT100",
    images: ["https://i.ibb.co/sL4S0FX/images-19.jpg"],
    specifications: [
      { label: "SKU", value: "VT-100-24MW-N" },
      { label: "Brand", value: "Motorola Solutions" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 136,
    oem: "Motorola Solutions",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "24 Month Warranty for VT100 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-68",
    sku: "VT-100-DOCK14-12MW",
    name: "12 Month Warranty for VT100 Dock14",
    slug: "12-month-warranty-for-vt100-dock14-vt-100-dock14-12mw",
    brand: "Motorola Solutions",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 156,
    priceNGN: 156 * 1500,
    description: "Warranty: +12 mnths for VT-100-DOCK14",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Body-Worn-Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "VT-100-DOCK14-12MW" },
      { label: "Brand", value: "Motorola Solutions" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 76,
    oem: "Motorola Solutions",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "12 Month Warranty for VT100 Dock14 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-69",
    sku: "VT-100-DOCK14-24MW",
    name: "24 Month Warranty for VT100 14 port dock",
    slug: "24-month-warranty-for-vt100-14-port-dock-vt-100-dock14-24mw",
    brand: "Motorola Solutions",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 258,
    priceNGN: 258 * 1500,
    description: "Warranty: +24 Months warranty for VT-100-DOCK14",
    images: ["https://i.ibb.co/RkSsDXpm/images-20.jpg"],
    specifications: [
      { label: "SKU", value: "VT-100-DOCK14-24MW" },
      { label: "Brand", value: "Motorola Solutions" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 114,
    oem: "Motorola Solutions",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "24 Month Warranty for VT100 14 port dock Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-70",
    sku: "VT-100-FIX-ALIG",
    name: "Videoigator clip for VT100",
    slug: "videoigator-clip-for-vt100-vt-100-fix-alig",
    brand: "Motorola Solutions",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 24,
    priceNGN: 24 * 1500,
    description: "VT100 series rotatable long Videoigator clip",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/VT-100-FIX-ALIG_070520.jpg"],
    specifications: [
      { label: "SKU", value: "VT-100-FIX-ALIG" },
      { label: "Brand", value: "Motorola Solutions" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 93,
    oem: "Motorola Solutions",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Videoigator clip for VT100 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-71",
    sku: "VT-100-FIX-EP",
    name: "Epaulette Mount for VT100",
    slug: "epaulette-mount-for-vt100-vt-100-fix-ep",
    brand: "Motorola Solutions",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 30,
    priceNGN: 30 * 1500,
    description: "VT100 series epaulette mount",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/VT-100-FIX-EP_070520.jpg"],
    specifications: [
      { label: "SKU", value: "VT-100-FIX-EP" },
      { label: "Brand", value: "Motorola Solutions" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 91,
    oem: "Motorola Solutions",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Epaulette Mount for VT100 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-72",
    sku: "VT-100-FIX-KF-ALT",
    name: "Klick Fast Stud for VT100",
    slug: "klick-fast-stud-for-vt100-vt-100-fix-kf-alt",
    brand: "Motorola Solutions",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 24,
    priceNGN: 24 * 1500,
    description: "VT100 series Klick Fast stud",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/VT-100-FIX-KF-ALT_070520.jpg"],
    specifications: [
      { label: "SKU", value: "VT-100-FIX-KF-ALT" },
      { label: "Brand", value: "Motorola Solutions" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 143,
    oem: "Motorola Solutions",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Klick Fast Stud for VT100 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-73",
    sku: "VT-100-FIX-SPORT",
    name: "Sports Camera Pillar (VT100)",
    slug: "sports-camera-pillar-vt100-vt-100-fix-sport",
    brand: "Motorola Solutions",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 30,
    priceNGN: 30 * 1500,
    description: "VT-100 series sports camera pillar",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/VT-100-FIX-SPORT-12102020.jpg"],
    specifications: [
      { label: "SKU", value: "VT-100-FIX-SPORT" },
      { label: "Brand", value: "Motorola Solutions" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 116,
    oem: "Motorola Solutions",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Sports Camera Pillar (VT100) Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-74",
    sku: "VT-100-N",
    name: "VT100 Body-worn camera",
    slug: "vt100-body-worn-camera-vt-100-n",
    brand: "Motorola Solutions",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 494.17,
    priceNGN: 494.17 * 1500,
    description: "Body-worn VT100 camera. Available only for EFTA; US; Australia; New Zealand and Canada.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/VT100-In-Hand-PDP-%281%29_070520.jpg"],
    specifications: [
      { label: "SKU", value: "VT-100-N" },
      { label: "Brand", value: "Motorola Solutions" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 108,
    oem: "Motorola Solutions",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "VT100 Body-worn camera Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-75",
    sku: "VT-100-SOLO-12MW",
    name: "12 Month Warranty for VT100 Solo Dock",
    slug: "12-month-warranty-for-vt100-solo-dock-vt-100-solo-12mw",
    brand: "Motorola Solutions",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 42,
    priceNGN: 42 * 1500,
    description: "Warranty: +12 Months warranty for VT-100-SOLO",
    images: ["https://i.ibb.co/RkSsDXpm/images-20.jpg"],
    specifications: [
      { label: "SKU", value: "VT-100-SOLO-12MW" },
      { label: "Brand", value: "Motorola Solutions" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 136,
    oem: "Motorola Solutions",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "12 Month Warranty for VT100 Solo Dock Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-76",
    sku: "VT-100-SOLO-24MW",
    name: "24 Month Warranty for VT100 Solo Dock",
    slug: "24-month-warranty-for-vt100-solo-dock-vt-100-solo-24mw",
    brand: "Motorola Solutions",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 72,
    priceNGN: 72 * 1500,
    description: "Warranty: +24 Months warranty for VT-100-SOLO",
    images: ["https://i.ibb.co/hJbWBZDQ/images-23.jpg"],
    specifications: [
      { label: "SKU", value: "VT-100-SOLO-24MW" },
      { label: "Brand", value: "Motorola Solutions" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 102,
    oem: "Motorola Solutions",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "24 Month Warranty for VT100 Solo Dock Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-77",
    sku: "3.0C-H5A-CR1-IR",
    name: "3.0C-H5A-CR1-IR",
    slug: "30c-h5a-cr1-ir-30c-h5a-cr1-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 1985.76,
    priceNGN: 1985.76 * 1500,
    description: "H5A; Corner; CRS; 3.0 MP WDR; 3-9mm;IR",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/H5A-CR WS.png"],
    specifications: [
      { label: "SKU", value: "3.0C-H5A-CR1-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 70,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "3.0C-H5A-CR1-IR Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-78",
    sku: "3.0C-H5A-CR1-IR-SS",
    name: "3.0C-H5A-CR1-IR-SS",
    slug: "30c-h5a-cr1-ir-ss-30c-h5a-cr1-ir-ss",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 2399.04,
    priceNGN: 2399.04 * 1500,
    description: "H5A; Corner; SS; 3.0 MP WDR; 3-9mm; IR",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/H5A-CR SS.png"],
    specifications: [
      { label: "SKU", value: "3.0C-H5A-CR1-IR-SS" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 126,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "3.0C-H5A-CR1-IR-SS Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-79",
    sku: "3.0C-H5A-CR2-IR",
    name: "3.0C-H5A-CR2-IR",
    slug: "30c-h5a-cr2-ir-30c-h5a-cr2-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 1784.16,
    priceNGN: 1784.16 * 1500,
    description: "Avigilon H5A Corner Camera; 2.3mm Fixed Lens;  3 MP; White Steel",
    images: ["https://drive.google.com/file/d/1YZPGR1unlEly0oLstLZ6ycTm7bAoF7st/view?usp=sharing"],
    specifications: [
      { label: "SKU", value: "3.0C-H5A-CR2-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 112,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "3.0C-H5A-CR2-IR Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-80",
    sku: "3.0C-H5A-CR2-IR-SS",
    name: "3.0C-H5A-CR2-IR-SS",
    slug: "30c-h5a-cr2-ir-ss-30c-h5a-cr2-ir-ss",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 2155.86,
    priceNGN: 2155.86 * 1500,
    description: "Avigilon H5A Corner Camera; 2.3mm Fixed Lens;  3 MP; Stainless Steel",
    images: ["https://drive.google.com/file/d/1ASTw6nIOLphMrrrexBGZx01e4tjLxdfr/view?usp=sharing"],
    specifications: [
      { label: "SKU", value: "3.0C-H5A-CR2-IR-SS" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 141,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "3.0C-H5A-CR2-IR-SS Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-81",
    sku: "5.0C-H5A-CR1-IR",
    name: "5.0C-H5A-CR1-IR",
    slug: "50c-h5a-cr1-ir-50c-h5a-cr1-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 2647.26,
    priceNGN: 2647.26 * 1500,
    description: "H5A; Corner; CRS; 5.0 MP WDR; 3-9mm;IR",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/H5A-CR WS.png"],
    specifications: [
      { label: "SKU", value: "5.0C-H5A-CR1-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 143,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "5.0C-H5A-CR1-IR Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-82",
    sku: "5.0C-H5A-CR1-IR-SS",
    name: "5.0C-H5A-CR1-IR-SS",
    slug: "50c-h5a-cr1-ir-ss-50c-h5a-cr1-ir-ss",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 3061.8,
    priceNGN: 3061.8 * 1500,
    description: "H5A; Corner; SS; 5.0 MP WDR; 3-9mm; IR",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/H5A-CR SS.png"],
    specifications: [
      { label: "SKU", value: "5.0C-H5A-CR1-IR-SS" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 97,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "5.0C-H5A-CR1-IR-SS Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-83",
    sku: "5.0C-H5A-CR2-IR",
    name: "5.0C-H5A-CR2-IR",
    slug: "50c-h5a-cr2-ir-50c-h5a-cr2-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 2378.88,
    priceNGN: 2378.88 * 1500,
    description: "Avigilon H5A Corner Camera; 2.3mm Fixed Lens;  5 MP; White Steel",
    images: ["https://drive.google.com/file/d/1YZPGR1unlEly0oLstLZ6ycTm7bAoF7st/view?usp=sharing"],
    specifications: [
      { label: "SKU", value: "5.0C-H5A-CR2-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 120,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "5.0C-H5A-CR2-IR Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-84",
    sku: "5.0C-H5A-CR2-IR-SS",
    name: "5.0C-H5A-CR2-IR-SS",
    slug: "50c-h5a-cr2-ir-ss-50c-h5a-cr2-ir-ss",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 2750.58,
    priceNGN: 2750.58 * 1500,
    description: "Avigilon H5A Corner Camera; 2.3mm Fixed Lens;  5 MP; Stainless Steel",
    images: ["https://drive.google.com/file/d/1ASTw6nIOLphMrrrexBGZx01e4tjLxdfr/view?usp=sharing"],
    specifications: [
      { label: "SKU", value: "5.0C-H5A-CR2-IR-SS" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 86,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "5.0C-H5A-CR2-IR-SS Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-85",
    sku: "CR-FFKIT-SS",
    name: "CR-FFKIT-SS",
    slug: "cr-ffkit-ss-cr-ffkit-ss",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 464.46,
    priceNGN: 464.46 * 1500,
    description: "H5A Corner Front Faceplate replacement Kit Stainless Steel",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "CR-FFKIT-SS" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 172,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "CR-FFKIT-SS Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-86",
    sku: "CR-FFKIT-WHT",
    name: "CR-FFKIT-WHT",
    slug: "cr-ffkit-wht-cr-ffkit-wht",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 371.56,
    priceNGN: 371.56 * 1500,
    description: "H5A Corner Front Faceplate replacement Kit White Steel",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "CR-FFKIT-WHT" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 127,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "CR-FFKIT-WHT Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-87",
    sku: "VI-5GHUB-4",
    name: "Motorola Solutions 5G Hub",
    slug: "motorola-solutions-5g-hub-vi-5ghub-4",
    brand: "Motorola Solutions",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 4890,
    priceNGN: 4890 * 1500,
    description: "5G/LTE router for up to four PoE+ cameras",
    images: ["https://i.ibb.co/N8cb5Dg/images-26.jpg"],
    specifications: [
      { label: "SKU", value: "VI-5GHUB-4" },
      { label: "Brand", value: "Motorola Solutions" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 134,
    oem: "Motorola Solutions",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Motorola Solutions 5G Hub Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-88",
    sku: "VS-L6A-SHADE",
    name: "L6A Replacement Shade",
    slug: "l6a-replacement-shade-vs-l6a-shade",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 60,
    priceNGN: 60 * 1500,
    description: "L6A Replacement Shade",
    images: ["https://i.ibb.co/hJbWBZDQ/images-23.jpg"],
    specifications: [
      { label: "SKU", value: "VS-L6A-SHADE" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 159,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "L6A Replacement Shade Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-89",
    sku: "VSF-L6A-7IR",
    name: "L6A 3MP LPR Camera; 730nm",
    slug: "l6a-3mp-lpr-camera-730nm-vsf-l6a-7ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 6293.7,
    priceNGN: 6293.7 * 1500,
    description: "L6A Dual Lens 3MP LPR Camera; 730nm. LPR License and 5 Years of Warranty Included. (Primary Model)",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/L6A%20Avigilon%20Storefront%20Image.png"],
    specifications: [
      { label: "SKU", value: "VSF-L6A-7IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 178,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "L6A 3MP LPR Camera; 730nm Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-90",
    sku: "VSF-L6A-8IR",
    name: "L6A 3MP LPR Camera; 850nm",
    slug: "l6a-3mp-lpr-camera-850nm-vsf-l6a-8ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 6293.7,
    priceNGN: 6293.7 * 1500,
    description: "L6A Dual Lens 3MP LPR Camera; 850nm. LPR License and 5 Years of Warranty Included.",
    images: ["https://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/L6A%20Avigilon%20Storefront%20Image.png"],
    specifications: [
      { label: "SKU", value: "VSF-L6A-8IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 136,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "L6A 3MP LPR Camera; 850nm Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-91",
    sku: "3C-H5MOD-RP4",
    name: "3MP Pinhole Right Angle Imager (H5A Modular)",
    slug: "3mp-pinhole-right-angle-imager-h5a-modular-3c-h5mod-rp4",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 332.57,
    priceNGN: 332.57 * 1500,
    description: "3MP; H5A Mod; WDR; 3.7mm Fixed Pinhole Lens; f/2.5; Right Angle Imager Module",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H5A%20Modular/Angle%20Sensor%20FRT%203_4%20LT%20Cover%20Exploded%20V2%20AVO-11192021.png"],
    specifications: [
      { label: "SKU", value: "3C-H5MOD-RP4" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 146,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "3MP Pinhole Right Angle Imager (H5A Modular) Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-92",
    sku: "BRKTMD-1001",
    name: "DIN Rail Mount for Modular Camera Main Unit",
    slug: "din-rail-mount-for-modular-camera-main-unit-brktmd-1001",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 55.94,
    priceNGN: 55.94 * 1500,
    description: "DIN Rail Mount for Modular Camera Main Unit",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "BRKTMD-1001" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 171,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "DIN Rail Mount for Modular Camera Main Unit Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-93",
    sku: "BRKTMD-1021",
    name: "Replacement Flat Bracket for Modular CameraRight Angle Sensor Head",
    slug: "replacement-flat-bracket-for-modular-cameraright-angle-sensor-head-brktmd-1021",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 41.82,
    priceNGN: 41.82 * 1500,
    description: "Replacement Flat Bracket for Modular CameraRight Angle Sensor Head",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "BRKTMD-1021" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 164,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Replacement Flat Bracket for Modular CameraRight Angle Sensor Head Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-94",
    sku: "CBL2M-1001",
    name: "2m (6 ft) HD BNC Cable for Modular Camera",
    slug: "2m-6-ft-hd-bnc-cable-for-modular-camera-cbl2m-1001",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 73.46,
    priceNGN: 73.46 * 1500,
    description: "2m (6 ft) HD BNC Cable for Modular Camera",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H5A%20Modular/Modular%20Copper%20Cables-01072022.png"],
    specifications: [
      { label: "SKU", value: "CBL2M-1001" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 133,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "2m (6 ft) HD BNC Cable for Modular Camera Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-95",
    sku: "CBL5M-1001",
    name: "5m (16 ft) HD BNC Cable for Modular Camera",
    slug: "5m-16-ft-hd-bnc-cable-for-modular-camera-cbl5m-1001",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 106.85,
    priceNGN: 106.85 * 1500,
    description: "5m (16 ft) HD BNC Cable for Modular Camera",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H5A%20Modular/Modular%20Copper%20Cables-01072022.png"],
    specifications: [
      { label: "SKU", value: "CBL5M-1001" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 155,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "5m (16 ft) HD BNC Cable for Modular Camera Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-96",
    sku: "H5A-MOD-2P",
    name: "H5A Modular Main Unit - 2 Port",
    slug: "h5a-modular-main-unit-2-port-h5a-mod-2p",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 780.43,
    priceNGN: 780.43 * 1500,
    description: "2 Port H5A Modular Main Unit; Next-Generation Analytics",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/H5A%20Modular/HUB%20FRT%203_4%20V2%20AVO-11192021.png"],
    specifications: [
      { label: "SKU", value: "H5A-MOD-2P" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 140,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "H5A Modular Main Unit - 2 Port Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-97",
    sku: "3.0C-H4VI-RO1-IR",
    name: "3MP H4 Video Intercom with IR",
    slug: "3mp-h4-video-intercom-with-ir-30c-h4vi-ro1-ir",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 1902.6,
    priceNGN: 1902.6 * 1500,
    description: "3.0 MP; H4 Video Intercom; WDR; LightCatcher; Day/Night; 1.83mm f/2.4; Integrated IR; Recessed Mount",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/Avigilon_H4-Video-Intercom_Front_062020.jpg"],
    specifications: [
      { label: "SKU", value: "3.0C-H4VI-RO1-IR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 159,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "3MP H4 Video Intercom with IR Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-98",
    sku: "H4LPC-WARR-EXTEND-1YR",
    name: "H4 LPC 1 Year Extended Warranty",
    slug: "h4-lpc-1-year-extended-warranty-h4lpc-warr-extend-1yr",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 128.27,
    priceNGN: 128.27 * 1500,
    description: "Extended Warranty for H4 LPC camera only; 1 year extension",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Warranty_070720.jpg"],
    specifications: [
      { label: "SKU", value: "H4LPC-WARR-EXTEND-1YR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 150,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "H4 LPC 1 Year Extended Warranty Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-99",
    sku: "H4LPC-WARR-EXTEND-2YR",
    name: "H4 LPC 2 Year Extended Warranty",
    slug: "h4-lpc-2-year-extended-warranty-h4lpc-warr-extend-2yr",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 256.56,
    priceNGN: 256.56 * 1500,
    description: "Extended Warranty for H4 LPC camera only; 2 years extension",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Warranty_070720.jpg"],
    specifications: [
      { label: "SKU", value: "H4LPC-WARR-EXTEND-2YR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 106,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "H4 LPC 2 Year Extended Warranty Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-100",
    sku: "H4VI-AC-RELY1",
    name: "Safety Relay for H4 Video Intercom",
    slug: "safety-relay-for-h4-video-intercom-h4vi-ac-rely1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 178.43,
    priceNGN: 178.43 * 1500,
    description: "Safety Relay for H4 Video Intercom",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/Avigilon_H4-Video-Intercom_Safety-Relay_Front_070120.jpg"],
    specifications: [
      { label: "SKU", value: "H4VI-AC-RELY1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 120,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Safety Relay for H4 Video Intercom Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-101",
    sku: "H4VI-ACCS-KIT1",
    name: "Replacement installation accessories for H4 Video Intercom",
    slug: "replacement-installation-accessories-for-h4-video-intercom-h4vi-accs-kit1",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 29.75,
    priceNGN: 29.75 * 1500,
    description: "Replacement installation accessories for H4VI. Includes terminal block plugs and screws.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Cameras-and-Accessories_070720.jpg"],
    specifications: [
      { label: "SKU", value: "H4VI-ACCS-KIT1" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 165,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "Replacement installation accessories for H4 Video Intercom Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-102",
    sku: "H4VI-WARR-EXTEND-1YR",
    name: "H4 Video Intercom 1 Year Extended Warranty",
    slug: "h4-video-intercom-1-year-extended-warranty-h4vi-warr-extend-1yr",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 167.63,
    priceNGN: 167.63 * 1500,
    description: "Extended Warranty for H4 Video Intercom; 1 year extension",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Warranty_070720.jpg"],
    specifications: [
      { label: "SKU", value: "H4VI-WARR-EXTEND-1YR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 184,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "H4 Video Intercom 1 Year Extended Warranty Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-bundle-103",
    sku: "H4VI-WARR-EXTEND-2YR",
    name: "H4 Video Intercom 2 Years Extended Warranty",
    slug: "h4-video-intercom-2-years-extended-warranty-h4vi-warr-extend-2yr",
    brand: "Avigilon",
    category: "Electronic Security",
    subcategory: "Camera Bundle",
    priceUSD: 335.26,
    priceNGN: 335.26 * 1500,
    description: "Extended Warranty for H4 Video Intercom; 2 years extension",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/VS/eCommerce-Site_Generic-Image_Warranty_070720.jpg"],
    specifications: [
      { label: "SKU", value: "H4VI-WARR-EXTEND-2YR" },
      { label: "Brand", value: "Avigilon" },
      { label: "Category", value: "Electronic Security" },
      { label: "Subcategory", value: "Camera Bundle" }
    ],
    stock: 99,
    oem: "Avigilon",
    productType: "Enterprise",
    featured: false,
    popular: false,
    downloads: [
      { title: "H4 Video Intercom 2 Years Extended Warranty Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  }
];

export const EX_JUNCTION_BOX_PRODUCTS: Product[] = [
  {
    id: "sp-ex-jbox-01",
    sku: "JBOX-1201",
    name: "Junction Box for Dual Head Cameras",
    slug: "junction-box-for-dual-head-cameras-jbox-1201",
    brand: "Pelco",
    category: "Ex-Proof Equipments",
    subcategory: "EX-Junction Box",
    priceUSD: 135,
    priceNGN: 135 * 1500,
    description: "Junction Box for Dual Head Cameras",
    images: ["https://i.ibb.co/DH8wYR0z/images-48.jpg"],
    specifications: [
      { label: "SKU", value: "JBOX-1201" },
      { label: "Brand", value: "Pelco" },
      { label: "Category", value: "Ex-Proof Equipments" },
      { label: "Subcategory", value: "EX-Junction Box" }
    ],
    stock: 274,
    oem: "Pelco",
    productType: "Hazardous Area",
    featured: true,
    popular: true,
    downloads: [
      { title: "JBOX-1201 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-ex-jbox-02",
    sku: "SRXV2-JBX-1001",
    name: "Sarix Value 2 Junction Box for Indoor Dome",
    slug: "sarix-value-2-junction-box-for-indoor-dome-srxv2-jbx-1001",
    brand: "Pelco",
    category: "Ex-Proof Equipments",
    subcategory: "EX-Junction Box",
    priceUSD: 135,
    priceNGN: 135 * 1500,
    description: "Sarix Value 2 Junction Box for Indoor Dome (Shipping from May2025)",
    images: ["https://i.ibb.co/ksRmCd9B/images-49.jpg"],
    specifications: [
      { label: "SKU", value: "SRXV2-JBX-1001" },
      { label: "Brand", value: "Pelco" },
      { label: "Category", value: "Ex-Proof Equipments" },
      { label: "Subcategory", value: "EX-Junction Box" }
    ],
    stock: 193,
    oem: "Pelco",
    productType: "Hazardous Area",
    featured: false,
    popular: true,
    downloads: [
      { title: "SRXV2-JBX-1001 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-ex-jbox-03",
    sku: "SRXV2-JBX-1003",
    name: "Sarix Value 2 Junction Box for Outdoor Dome",
    slug: "sarix-value-2-junction-box-for-outdoor-dome-srxv2-jbx-1003",
    brand: "Pelco",
    category: "Ex-Proof Equipments",
    subcategory: "EX-Junction Box",
    priceUSD: 195,
    priceNGN: 195 * 1500,
    description: "Sarix Value 2 Junction Box for Outdoor Domes (Shipping from April2025)",
    images: ["https://i.ibb.co/qMMG97dx/images-50.jpg"],
    specifications: [
      { label: "SKU", value: "SRXV2-JBX-1003" },
      { label: "Brand", value: "Pelco" },
      { label: "Category", value: "Ex-Proof Equipments" },
      { label: "Subcategory", value: "EX-Junction Box" }
    ],
    stock: 491,
    oem: "Pelco",
    productType: "Hazardous Area",
    featured: false,
    popular: true,
    downloads: [
      { title: "SRXV2-JBX-1003 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-ex-jbox-04",
    sku: "IFBV-JB",
    name: "Junction Box for Sarix Value IFV Fixed Lens Turrets and IBV Bullets",
    slug: "junction-box-for-sarix-value-ifv-fixed-lens-turrets-and-ibv-bullets-ifbv-jb",
    brand: "Pelco",
    category: "Ex-Proof Equipments",
    subcategory: "EX-Junction Box",
    priceUSD: 120,
    priceNGN: 120 * 1500,
    description: "Junction Box for IFV Series Sarix Value Environmental Fixed Lens Turrets and IBV Series Environmental Bullets",
    images: ["https://i.ibb.co/ymrL6ccG/images-51.jpg"],
    specifications: [
      { label: "SKU", value: "IFBV-JB" },
      { label: "Brand", value: "Pelco" },
      { label: "Category", value: "Ex-Proof Equipments" },
      { label: "Subcategory", value: "EX-Junction Box" }
    ],
    stock: 723,
    oem: "Pelco",
    productType: "Hazardous Area",
    featured: true,
    popular: true,
    downloads: [
      { title: "IFBV-JB Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-ex-jbox-05",
    sku: "IMJTV-JB",
    name: "Junction Box for Sarix Value IMV; IJV; ITV Series",
    slug: "junction-box-for-sarix-value-imv-ijv-itv-series-imjtv-jb",
    brand: "Pelco",
    category: "Ex-Proof Equipments",
    subcategory: "EX-Junction Box",
    priceUSD: 134,
    priceNGN: 134 * 1500,
    description: "Junction Box for Sarix Value Environmental IMV Series Varifocal Domes And IJV Series Fixed Focal And ITV Series Varifocal Turrets",
    images: ["https://i.ibb.co/qMMG97dx/images-50.jpg"],
    specifications: [
      { label: "SKU", value: "IMJTV-JB" },
      { label: "Brand", value: "Pelco" },
      { label: "Category", value: "Ex-Proof Equipments" },
      { label: "Subcategory", value: "EX-Junction Box" }
    ],
    stock: 385,
    oem: "Pelco",
    productType: "Hazardous Area",
    featured: false,
    popular: true,
    downloads: [
      { title: "IMJTV-JB Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  }
];

export const INDUSTRIAL_SWITCH_PRODUCTS: Product[] = [
  {
    id: "sp-ind-switch-01",
    sku: "SM24TAT2SA-EU",
    name: "26-Port Gigabit Managed PoE+ Switch",
    slug: "26-port-gigabit-managed-poe-plus-switch-sm24tat2sa-eu",
    brand: "Lantronix",
    category: "Industrial Switches",
    subcategory: "Industrial Switches",
    priceUSD: 2023.44,
    priceNGN: 2023.44 * 1500,
    description: "26-Port Gigabit Managed PoE+ Switch with 24 PoE+ ports (370W power budget) and 2 SFP uplink ports.",
    images: ["http://avoweb1.s3-us-west-2.amazonaws.com/Prod/PRODUCT%20MARKETING/Lantronix%20PoE%20Switch/LANTRONIX-POE_SM8TAT2SA.jpg"],
    specifications: [
      { label: "SKU", value: "SM24TAT2SA-EU" },
      { label: "Brand", value: "Lantronix" },
      { label: "Category", value: "Industrial Switches" },
      { label: "Subcategory", value: "Industrial Switches" },
      { label: "Ports", value: "24 PoE+ ports (370W power budget) + 2 SFP uplink ports" }
    ],
    stock: 482,
    oem: "Lantronix",
    productType: "Enterprise",
    featured: true,
    popular: true,
    downloads: [
      { title: "SM24TAT2SA-EU Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  }
];

export const UPS_PDU_PRODUCTS: Product[] = [
  {
    id: "sp-ups-pdu-01",
    sku: "SRV3KIL",
    name: "APC Easy UPS On-Line",
    slug: "apc-easy-ups-on-line-srv3kil",
    brand: "APC",
    category: "UPS & PDU",
    subcategory: "UPS & PDU",
    priceUSD: 520,
    priceNGN: 520 * 1500,
    description: "APC Easy UPS On-Line Ext. Runtime SRV 3000VA 230V with External Battery Pack SRV3KIL",
    images: ["https://i.ibb.co/7xc0RzVL/apc-easy-ups-on-line-3000va-230v-with-external-battery-pack-srv3kil.jpg"],
    specifications: [
      { label: "SKU", value: "SRV3KIL" },
      { label: "Brand", value: "APC" },
      { label: "Category", value: "UPS & PDU" },
      { label: "Subcategory", value: "UPS & PDU" }
    ],
    stock: 282,
    oem: "APC",
    productType: "Enterprise",
    featured: true,
    popular: true,
    downloads: [
      { title: "SRV3KIL Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-ups-pdu-02",
    sku: "SRV4KIL",
    name: "APC Easy UPS SMV",
    slug: "apc-easy-ups-smv-srv4kil",
    brand: "APC",
    category: "UPS & PDU",
    subcategory: "UPS & PDU",
    priceUSD: 850,
    priceNGN: 850 * 1500,
    description: "APC Easy UPS SMV 3000VA, Universal Outlet, 230V SMV3000AI-MSX - Line Interactive, 1 Phase",
    images: ["https://i.ibb.co/KxhDXBLm/apc-easy-ups-smv-3000va-smv3000ai-ms.jpg"],
    specifications: [
      { label: "SKU", value: "SRV4KIL" },
      { label: "Brand", value: "APC" },
      { label: "Category", value: "UPS & PDU" },
      { label: "Subcategory", value: "UPS & PDU" }
    ],
    stock: 167,
    oem: "APC",
    productType: "Enterprise",
    featured: false,
    popular: true,
    downloads: [
      { title: "SRV4KIL Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-ups-pdu-03",
    sku: "SRV5KIL",
    name: "APC Essential SurgeArrest",
    slug: "apc-essential-surgearrest-srv5kil",
    brand: "APC",
    category: "UPS & PDU",
    subcategory: "UPS & PDU",
    priceUSD: 52,
    priceNGN: 52 * 1500,
    description: "APC Essential SurgeArrest 5 outlets 230V UK - Protection Against Lightning & Power Surges for Computers and Electronics",
    images: ["https://i.ibb.co/VcKSgDdK/apc-essential-surgearrest-5-outlets-230v-pm5-uk-surge-protector.jpg"],
    specifications: [
      { label: "SKU", value: "SRV5KIL" },
      { label: "Brand", value: "APC" },
      { label: "Category", value: "UPS & PDU" },
      { label: "Subcategory", value: "UPS & PDU" }
    ],
    stock: 3289,
    oem: "APC",
    productType: "Enterprise",
    featured: false,
    popular: true,
    downloads: [
      { title: "SRV5KIL Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-ups-pdu-04",
    sku: "SRV6KIL",
    name: "APC Smart-UPS C 1500VA LCD 230V",
    slug: "apc-smart-ups-c-1500va-lcd-230v-srv6kil",
    brand: "APC",
    category: "UPS & PDU",
    subcategory: "UPS & PDU",
    priceUSD: 189,
    priceNGN: 189 * 1500,
    description: "APC Smart-UPS C 1500VA LCD 230V - 900 Watts/1500VA, Input 230V/Output 230V, Interface Port USB SMC1500I",
    images: ["https://i.ibb.co/xqcWVdmd/apc-smart-ups-c-1500va-lcd-230v-900-watts-smc1500i.jpg"],
    specifications: [
      { label: "SKU", value: "SRV6KIL" },
      { label: "Brand", value: "APC" },
      { label: "Category", value: "UPS & PDU" },
      { label: "Subcategory", value: "UPS & PDU" }
    ],
    stock: 450,
    oem: "APC",
    productType: "Enterprise",
    featured: true,
    popular: true,
    downloads: [
      { title: "SRV6KIL Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-ups-pdu-05",
    sku: "SRT3000XLI",
    name: "APC Smart-UPS On-Line SRT",
    slug: "apc-smart-ups-on-line-srt-srt3000xli",
    brand: "APC",
    category: "UPS & PDU",
    subcategory: "UPS & PDU",
    priceUSD: 860,
    priceNGN: 860 * 1500,
    description: "APC Smart-UPS On-Line SRT 3000VA 230V SRT3000XLI - 2700 Watts/3000VA, Input 230V /Output 230V",
    images: ["https://i.ibb.co/4n0gwMdQ/apc-smart-ups-on-line-srt-3000va-230v-srt3000xli-2700-watts-3000va.jpg"],
    specifications: [
      { label: "SKU", value: "SRT3000XLI" },
      { label: "Brand", value: "APC" },
      { label: "Category", value: "UPS & PDU" },
      { label: "Subcategory", value: "UPS & PDU" }
    ],
    stock: 284,
    oem: "APC",
    productType: "Enterprise",
    featured: false,
    popular: true,
    downloads: [
      { title: "SRT3000XLI Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  }
];

export const INDUSTRIAL_SOLAR_PANELS_PRODUCTS: Product[] = [
  {
    id: "sp-solar-panel-01",
    sku: "SP-YA-HA-100",
    name: "Canadian Solar 705w Watts Mono Solar Panel",
    slug: "canadian-solar-705w-watts-mono-solar-panel-sp-ya-ha-100",
    brand: "Canadian Solar",
    category: "Renewable Energy",
    subcategory: "Industrial Solar Panels",
    priceUSD: 805,
    priceNGN: 805 * 1500,
    isQuoteOnly: true,
    description: "705W Module efficiency up to 23.2 %. 30 Linear Power Performance Warranty. Excellent anti-LeTID & anti-PID performance. Low power degradation, high energy yield",
    images: ["https://i.ibb.co/Mxv48vjy/panel-1.jpg"],
    specifications: [
      { label: "SKU", value: "SP-YA-HA-100" },
      { label: "Brand", value: "Canadian Solar" },
      { label: "Category", value: "Renewable Energy" },
      { label: "Subcategory", value: "Industrial Solar Panels" },
      { label: "Power Output", value: "705W" }
    ],
    stock: 805,
    oem: "Canadian Solar",
    productType: "Enterprise",
    featured: true,
    popular: true,
    downloads: [
      { title: "SP-YA-HA-100 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-solar-panel-02",
    sku: "SP-YA-HA-101",
    name: "Canadian Solar 655w Watts Mono Solar Panel",
    slug: "canadian-solar-655w-watts-mono-solar-panel-sp-ya-ha-101",
    brand: "Canadian Solar",
    category: "Renewable Energy",
    subcategory: "Industrial Solar Panels",
    priceUSD: 583,
    priceNGN: 583 * 1500,
    isQuoteOnly: true,
    description: "665W module efficiency up to 21.7%. 25 years linear power output warranty. Comprehensive LID / LeTID mitigation technology, up to 50% lower degradation",
    images: ["https://i.ibb.co/Jwqj7Lz7/panel-2.jpg"],
    specifications: [
      { label: "SKU", value: "SP-YA-HA-101" },
      { label: "Brand", value: "Canadian Solar" },
      { label: "Category", value: "Renewable Energy" },
      { label: "Subcategory", value: "Industrial Solar Panels" },
      { label: "Power Output", value: "655W" }
    ],
    stock: 583,
    oem: "Canadian Solar",
    productType: "Enterprise",
    featured: true,
    popular: true,
    downloads: [
      { title: "SP-YA-HA-101 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-solar-panel-03",
    sku: "SP-YA-HA-102",
    name: "Canadian Solar 600w Watts Mono Solar Panel",
    slug: "canadian-solar-600w-watts-mono-solar-panel-sp-ya-ha-102",
    brand: "Canadian Solar",
    category: "Renewable Energy",
    subcategory: "Industrial Solar Panels",
    priceUSD: 209,
    priceNGN: 209 * 1500,
    isQuoteOnly: true,
    description: "600W module efficiency up to 21.6%. 25 years linear power output warranty. Comprehensive LID / LeTID mitigation technology, up to 50% lower degradation",
    images: ["https://i.ibb.co/67XDZ89L/panel-3.jpg"],
    specifications: [
      { label: "SKU", value: "SP-YA-HA-102" },
      { label: "Brand", value: "Canadian Solar" },
      { label: "Category", value: "Renewable Energy" },
      { label: "Subcategory", value: "Industrial Solar Panels" },
      { label: "Power Output", value: "600W" }
    ],
    stock: 209,
    oem: "Canadian Solar",
    productType: "Enterprise",
    featured: false,
    popular: true,
    downloads: [
      { title: "SP-YA-HA-102 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-solar-panel-04",
    sku: "SP-YA-HA-103",
    name: "Canadian Solar Panel 605w – CS7L (Monocrystalline)",
    slug: "canadian-solar-panel-605w-cs7l-monocrystalline-sp-ya-ha-103",
    brand: "Canadian Solar",
    category: "Renewable Energy",
    subcategory: "Industrial Solar Panels",
    priceUSD: 385,
    priceNGN: 385 * 1500,
    isQuoteOnly: true,
    description: "Canadian Solar 605w Solar Panel. Comprehensive LID / LeTID mitigation technology, up to 50% lower degradation",
    images: ["https://i.ibb.co/fVKg7hFy/panel-4.jpg"],
    specifications: [
      { label: "SKU", value: "SP-YA-HA-103" },
      { label: "Brand", value: "Canadian Solar" },
      { label: "Category", value: "Renewable Energy" },
      { label: "Subcategory", value: "Industrial Solar Panels" },
      { label: "Power Output", value: "605W" }
    ],
    stock: 385,
    oem: "Canadian Solar",
    productType: "Enterprise",
    featured: true,
    popular: true,
    downloads: [
      { title: "SP-YA-HA-103 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-solar-panel-05",
    sku: "SP-YA-HA-104",
    name: "Canadian Solar 670w Watts Mono Solar Panel",
    slug: "canadian-solar-670w-watts-mono-solar-panel-sp-ya-ha-104",
    brand: "Canadian Solar",
    category: "Renewable Energy",
    subcategory: "Industrial Solar Panels",
    priceUSD: 194,
    priceNGN: 194 * 1500,
    isQuoteOnly: true,
    description: "670W module efficiency up to 21.7%. 25 years linear power output warranty. Comprehensive LID / LeTID mitigation technology, up to 50% lower degradation",
    images: ["https://i.ibb.co/bjpfkV6Z/panel-5.jpg"],
    specifications: [
      { label: "SKU", value: "SP-YA-HA-104" },
      { label: "Brand", value: "Canadian Solar" },
      { label: "Category", value: "Renewable Energy" },
      { label: "Subcategory", value: "Industrial Solar Panels" },
      { label: "Power Output", value: "670W" }
    ],
    stock: 194,
    oem: "Canadian Solar",
    productType: "Enterprise",
    featured: false,
    popular: true,
    downloads: [
      { title: "SP-YA-HA-104 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-solar-panel-06",
    sku: "SP-YA-HA-105",
    name: "660 Watts Canadian Solar Panel",
    slug: "660-watts-canadian-solar-panel-sp-ya-ha-105",
    brand: "Canadian Solar",
    category: "Renewable Energy",
    subcategory: "Industrial Solar Panels",
    priceUSD: 609,
    priceNGN: 609 * 1500,
    isQuoteOnly: true,
    description: "660W module efficiency up to 21.6%. 25 years linear power output warranty. Comprehensive LID / LeTID mitigation technology, up to 50% lower degradation",
    images: ["https://i.ibb.co/Mxsf2xtQ/panel-6.png"],
    specifications: [
      { label: "SKU", value: "SP-YA-HA-105" },
      { label: "Brand", value: "Canadian Solar" },
      { label: "Category", value: "Renewable Energy" },
      { label: "Subcategory", value: "Industrial Solar Panels" },
      { label: "Power Output", value: "660W" }
    ],
    stock: 609,
    oem: "Canadian Solar",
    productType: "Enterprise",
    featured: true,
    popular: true,
    downloads: [
      { title: "SP-YA-HA-105 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-solar-panel-07",
    sku: "SP-YA-HA-106",
    name: "595 Watts HiKu7 Mono PERC Canadian Solar Panel",
    slug: "595-watts-hiku7-mono-perc-canadian-solar-panel-sp-ya-ha-106",
    brand: "Canadian Solar",
    category: "Renewable Energy",
    subcategory: "Industrial Solar Panels",
    priceUSD: 352,
    priceNGN: 352 * 1500,
    isQuoteOnly: true,
    description: "Module power up to 610 W. 25 years linear power output warranty. Comprehensive LID / LeTID mitigation technology, up to 50% lower degradation",
    images: ["https://i.ibb.co/PZfdTFKk/panel-7.png"],
    specifications: [
      { label: "SKU", value: "SP-YA-HA-106" },
      { label: "Brand", value: "Canadian Solar" },
      { label: "Category", value: "Renewable Energy" },
      { label: "Subcategory", value: "Industrial Solar Panels" },
      { label: "Power Output", value: "595W" }
    ],
    stock: 352,
    oem: "Canadian Solar",
    productType: "Enterprise",
    featured: false,
    popular: true,
    downloads: [
      { title: "SP-YA-HA-106 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-solar-panel-08",
    sku: "SP-YA-HA-107",
    name: "Canadian Solar 550w BiHiKu6 Mono PERC Solar Panel",
    slug: "canadian-solar-550w-bihiku6-mono-perc-solar-panel-sp-ya-ha-107",
    brand: "Canadian Solar",
    category: "Renewable Energy",
    subcategory: "Industrial Solar Panels",
    priceUSD: 581,
    priceNGN: 581 * 1500,
    isQuoteOnly: true,
    description: "550W module efficiency up to 20.6%. 25 years linear power output warranty. Comprehensive LID / LeTID mitigation technology, up to 50% lower degradation",
    images: ["https://i.ibb.co/k2XhpdyF/panel-8.png"],
    specifications: [
      { label: "SKU", value: "SP-YA-HA-107" },
      { label: "Brand", value: "Canadian Solar" },
      { label: "Category", value: "Renewable Energy" },
      { label: "Subcategory", value: "Industrial Solar Panels" },
      { label: "Power Output", value: "550W" }
    ],
    stock: 581,
    oem: "Canadian Solar",
    productType: "Enterprise",
    featured: true,
    popular: true,
    downloads: [
      { title: "SP-YA-HA-107 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "sp-solar-panel-09",
    sku: "SP-YA-HA-108",
    name: "415 Watts HiKu Mono PERC Canadian Solar Panel",
    slug: "415-watts-hiku-mono-perc-canadian-solar-panel-sp-ya-ha-108",
    brand: "Canadian Solar",
    category: "Renewable Energy",
    subcategory: "Industrial Solar Panels",
    priceUSD: 957,
    priceNGN: 957 * 1500,
    isQuoteOnly: true,
    description: "415W Canadian Solar - Super High Power Mono PERC HiKU. Heavy snow load up to 5400 Pa, enhanced wind load up to 2400 Pa. 1st year power degradation no more than 2%. Subsequent annual power degradation no more than 0.55%",
    images: ["https://i.ibb.co/xKz8Pd15/panel-9.png"],
    specifications: [
      { label: "SKU", value: "SP-YA-HA-108" },
      { label: "Brand", value: "Canadian Solar" },
      { label: "Category", value: "Renewable Energy" },
      { label: "Subcategory", value: "Industrial Solar Panels" },
      { label: "Power Output", value: "415W" }
    ],
    stock: 957,
    oem: "Canadian Solar",
    productType: "Enterprise",
    featured: false,
    popular: true,
    downloads: [
      { title: "SP-YA-HA-108 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  }
];

export const LITHIUM_BATTERIES_PRODUCTS: Product[] = [
  {
    id: "lb-battery-01",
    sku: "LB-YA-HA-101",
    name: "SVC LiFePO4 16 kwh Lithium Battery",
    slug: "svc-lifepo4-16-kwh-lithium-battery-lb-ya-ha-101",
    brand: "SVC",
    category: "Renewable Energy",
    subcategory: "Lithium LiFePO4 Batteries",
    priceUSD: 0,
    priceNGN: 0,
    isQuoteOnly: true,
    description: "16 kWh Lithium Battery - 51.2V 314Ah SVC LiFePO4 Lithium Battery (Floor Mounted)",
    images: ["https://i.ibb.co/6Rm87VYh/battery-2.png"],
    specifications: [
      { label: "SKU", value: "LB-YA-HA-101" },
      { label: "Brand", value: "SVC" },
      { label: "Category", value: "Renewable Energy" },
      { label: "Subcategory", value: "Lithium LiFePO4 Batteries" },
      { label: "Capacity", value: "16 kWh (51.2V 314Ah)" }
    ],
    stock: 705,
    oem: "SVC",
    productType: "Enterprise",
    featured: true,
    popular: true,
    downloads: [
      { title: "LB-YA-HA-101 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "lb-battery-02",
    sku: "LB-YA-HA-102",
    name: "SVC 11.8 kWh LiFePO4 Solar Battery",
    slug: "svc-11-8-kwh-lifepo4-solar-battery-lb-ya-ha-102",
    brand: "SVC",
    category: "Renewable Energy",
    subcategory: "Lithium LiFePO4 Batteries",
    priceUSD: 0,
    priceNGN: 0,
    isQuoteOnly: true,
    description: "11.8kWh Lithium Battery (51.2V 230Ah SVC Floor Mounted Battery). The 11.8kWh 51.2V LiFePO4 Lithium Battery by SVC is a modern energy storage solution for solar systems and backup power for home nad businesses",
    images: ["https://i.ibb.co/1tJvPRHN/battery-3.png"],
    specifications: [
      { label: "SKU", value: "LB-YA-HA-102" },
      { label: "Brand", value: "SVC" },
      { label: "Category", value: "Renewable Energy" },
      { label: "Subcategory", value: "Lithium LiFePO4 Batteries" },
      { label: "Capacity", value: "11.8 kWh (51.2V 230Ah)" }
    ],
    stock: 683,
    oem: "SVC",
    productType: "Enterprise",
    featured: true,
    popular: true,
    downloads: [
      { title: "LB-YA-HA-102 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "lb-battery-03",
    sku: "LB-YA-HA-103",
    name: "SVC 8 kWh LiFePO4 Solar Battery",
    slug: "svc-8-kwh-lifepo4-solar-battery-lb-ya-ha-103",
    brand: "SVC",
    category: "Renewable Energy",
    subcategory: "Lithium LiFePO4 Batteries",
    priceUSD: 0,
    priceNGN: 0,
    isQuoteOnly: true,
    description: "8 kWh Lithium Battery (25.6V SVC Floor Mounted Battery). 360 degree protection: such as SOC/SOH/ Anti-theft function. High discharge rate currents, suitable for on-grid or off-grid solar system and other loads.",
    images: ["https://i.ibb.co/DPsDT0rV/battery-5.jpg"],
    specifications: [
      { label: "SKU", value: "LB-YA-HA-103" },
      { label: "Brand", value: "SVC" },
      { label: "Category", value: "Renewable Energy" },
      { label: "Subcategory", value: "Lithium LiFePO4 Batteries" },
      { label: "Capacity", value: "8 kWh (25.6V)" }
    ],
    stock: 309,
    oem: "SVC",
    productType: "Enterprise",
    featured: false,
    popular: true,
    downloads: [
      { title: "LB-YA-HA-103 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "lb-battery-04",
    sku: "LB-YA-HA-104",
    name: "SVC 10.5kWh LiFePO4 Solar Battery",
    slug: "svc-10-5kwh-lifepo4-solar-battery-lb-ya-ha-104",
    brand: "SVC",
    category: "Renewable Energy",
    subcategory: "Lithium LiFePO4 Batteries",
    priceUSD: 0,
    priceNGN: 0,
    isQuoteOnly: true,
    description: "10.5kWh LiFePO4 - 51.2V 205AH Lithium Battery (BMP - Floor/Wall Mounted). Ensures real-time monitoring of voltage, current, and battery status.",
    images: ["https://i.ibb.co/BVWKS1vd/battery-6.png"],
    specifications: [
      { label: "SKU", value: "LB-YA-HA-104" },
      { label: "Brand", value: "SVC" },
      { label: "Category", value: "Renewable Energy" },
      { label: "Subcategory", value: "Lithium LiFePO4 Batteries" },
      { label: "Capacity", value: "10.5 kWh (51.2V 205Ah)" }
    ],
    stock: 585,
    oem: "SVC",
    productType: "Enterprise",
    featured: true,
    popular: true,
    downloads: [
      { title: "LB-YA-HA-104 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "lb-battery-05",
    sku: "LB-YA-HA-105",
    name: "SVC LiFePO4 15 kwh Lithium Battery",
    slug: "svc-lifepo4-15-kwh-lithium-battery-lb-ya-ha-105",
    brand: "SVC",
    category: "Renewable Energy",
    subcategory: "Lithium LiFePO4 Batteries",
    priceUSD: 0,
    priceNGN: 0,
    isQuoteOnly: true,
    description: "15 kWh lithium battery - 48V 200AH SVC LiFePO4 Lithium Battery (Floor Mounted). Featuring a built-in intelligent Battery Management System (BMS), it optimize and safeguards the battery while extending its service life.",
    images: ["https://i.ibb.co/Fb30n4gx/battery-7.jpg"],
    specifications: [
      { label: "SKU", value: "LB-YA-HA-105" },
      { label: "Brand", value: "SVC" },
      { label: "Category", value: "Renewable Energy" },
      { label: "Subcategory", value: "Lithium LiFePO4 Batteries" },
      { label: "Capacity", value: "15 kWh (48V 200Ah)" }
    ],
    stock: 794,
    oem: "SVC",
    productType: "Enterprise",
    featured: true,
    popular: true,
    downloads: [
      { title: "LB-YA-HA-105 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "lb-battery-06",
    sku: "LB-YA-HA-106",
    name: "SVC 10kWh LiFePO4 Solar Battery",
    slug: "svc-10kwh-lifepo4-solar-battery-lb-ya-ha-106",
    brand: "SVC",
    category: "Renewable Energy",
    subcategory: "Lithium LiFePO4 Batteries",
    priceUSD: 0,
    priceNGN: 0,
    isQuoteOnly: true,
    description: "10kWh LiFePO4 - 48V 200AH Lithium Battery (BMV - Wall Mounted) With 100A Max Charge/Discharge Current. Elegant and Stylish, wall-mounted installation",
    images: ["https://i.ibb.co/Fb30n4gx/battery-7.jpg"],
    specifications: [
      { label: "SKU", value: "LB-YA-HA-106" },
      { label: "Brand", value: "SVC" },
      { label: "Category", value: "Renewable Energy" },
      { label: "Subcategory", value: "Lithium LiFePO4 Batteries" },
      { label: "Capacity", value: "10 kWh (48V 200Ah)" }
    ],
    stock: 209,
    oem: "SVC",
    productType: "Enterprise",
    featured: false,
    popular: true,
    downloads: [
      { title: "LB-YA-HA-106 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "lb-battery-07",
    sku: "LB-YA-HA-107",
    name: "SVC 5kWh LiFePO4 Solar Battery",
    slug: "svc-5kwh-lifepo4-solar-battery-lb-ya-ha-107",
    brand: "SVC",
    category: "Renewable Energy",
    subcategory: "Lithium LiFePO4 Batteries",
    priceUSD: 0,
    priceNGN: 0,
    isQuoteOnly: true,
    description: "5kWh LiFePO4 - 48V 100AH Lithium Battery (BMV - Wall Mounted). Manufactured to withstand the most rigorous conditions of renewable energy applications and usage the 5kWh - 48V 100AH LiFePO4 lithium battery gives you the best value and performance for your installation.",
    images: ["https://i.ibb.co/DH1c6nTj/battery-9.png"],
    specifications: [
      { label: "SKU", value: "LB-YA-HA-107" },
      { label: "Brand", value: "SVC" },
      { label: "Category", value: "Renewable Energy" },
      { label: "Subcategory", value: "Lithium LiFePO4 Batteries" },
      { label: "Capacity", value: "5 kWh (48V 100Ah)" }
    ],
    stock: 358,
    oem: "SVC",
    productType: "Enterprise",
    featured: true,
    popular: true,
    downloads: [
      { title: "LB-YA-HA-107 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  },
  {
    id: "lb-battery-08",
    sku: "LB-YA-HA-108",
    name: "Rack Mounted Battery – BMR Series",
    slug: "rack-mounted-battery-bmr-series-lb-ya-ha-108",
    brand: "SVC",
    category: "Renewable Energy",
    subcategory: "Lithium LiFePO4 Batteries",
    priceUSD: 0,
    priceNGN: 0,
    isQuoteOnly: true,
    description: "LiFePO4 Lithium Battery: 5.12kWh - 48V 100AH (Floor and Rack Mounted). Manufactured to withstand the most rigorous conditions of renewable energy applications and usage this 5kWh - 48V 100AH LiFePO4 lithium battery gives you best value for your money and longer life-cycle.",
    images: ["https://i.ibb.co/Wpdq26p2/battery-1.jpg"],
    specifications: [
      { label: "SKU", value: "LB-YA-HA-108" },
      { label: "Brand", value: "SVC" },
      { label: "Category", value: "Renewable Energy" },
      { label: "Subcategory", value: "Lithium LiFePO4 Batteries" },
      { label: "Capacity", value: "5.12 kWh (48V 100Ah)" }
    ],
    stock: 781,
    oem: "SVC",
    productType: "Enterprise",
    featured: true,
    popular: true,
    downloads: [
      { title: "LB-YA-HA-108 Datasheet", type: "Data Sheet", url: "#" }
    ],
    reviews: []
  }
];

export const ACCESSORIES_PRODUCTS: Product[] = [
  ...mappedAccessories,
  ...PTZ_CAMERA_PRODUCTS,
  ...THERMAL_CAMERA_PRODUCTS,
  ...BOX_CAMERA_PRODUCTS,
  ...BULLET_CAMERA_PRODUCTS,
  ...PANORAMIC_CAMERA_PRODUCTS,
  ...DOME_CAMERA_PRODUCTS,
  ...ELECTRICAL_WORKSTATION_PRODUCTS,
  ...NETWORK_VIDEO_RECORDER_PRODUCTS,
  ...CAMERA_BUNDLE_PRODUCTS,
  ...EX_JUNCTION_BOX_PRODUCTS,
  ...INDUSTRIAL_SWITCH_PRODUCTS,
  ...UPS_PDU_PRODUCTS,
  ...INDUSTRIAL_SOLAR_PANELS_PRODUCTS,
  ...LITHIUM_BATTERIES_PRODUCTS
];

