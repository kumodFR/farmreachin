/* Legal documents as structured content, so the same layout renders both and
   future agreements (MSA, SaaS terms, SOW, DPA, security schedule, AUP, NDA,
   retention policy, DSR procedure, incident response) can reuse the same
   shapes and terminology.

   Block types: 'p' (paragraph), 'ul' (bullet list), 'h3' (subsection),
   'address' (contact block), 'note' (set-apart advisory line).

   Dates are placeholders and must be set before publication. */

export const LEGAL_ENTITY = {
  name: 'Farmreach Technologies Pvt Ltd',
  website: 'farmreach.in',
  email: 'ypr@farmreach.in',
  addressLines: [
    '1st Floor, SSR Arcade,',
    'Plot No. 328, Road No. 1/2,',
    'Mathrusree Nagar, Hafeezpet,',
    'Miyapur, Hyderabad,',
    'Telangana 500049, India'
  ]
};

const EFFECTIVE = '18 August 2026';
const UPDATED = '18 August 2026';

const REVIEW_NOTE =
  'This document sets out Farmreach’s policy position for its public website. It is drafted in the Indian legal context, including the Information Technology Act, 2000 and rules made under it, and the Digital Personal Data Protection Act, 2023 and applicable Rules. It does not claim certification or guaranteed legal compliance, and should be reviewed by qualified Indian legal counsel before being treated as contractual or legal advice.';

export const TERMS = {
  path: '/terms',
  title: 'Terms of Use',
  eyebrow: 'Legal',
  meta: {
    title: 'Terms of Use — Farmreach Technologies',
    description:
      'Terms of Use governing access to and use of the Farmreach Technologies Pvt Ltd website, farmreach.in, and related publicly accessible digital content and services.'
  },
  effective: EFFECTIVE,
  updated: UPDATED,
  reviewNote: REVIEW_NOTE,
  intro: [
    'These Terms of Use govern access to and use of the Farmreach Technologies Pvt Ltd website, farmreach.in, and related publicly accessible digital content, features and services made available through the website.',
    'By accessing or using the website, the visitor agrees to use it responsibly and in accordance with these Terms.',
    'Where a customer, partner, employee, consultant or user enters into a separate written agreement with Farmreach, that agreement will govern the relevant commercial or service relationship to the extent of any inconsistency.'
  ],
  sections: [
    {
      id: 'about-farmreach',
      number: '1',
      heading: 'About Farmreach',
      blocks: [
        { type: 'p', text: 'Farmreach Technologies Pvt Ltd is an agricultural operating systems and transformation company operating from India.' },
        { type: 'p', text: 'Farmreach develops and provides technology, consulting, transformation and related services across agricultural operations.' },
        { type: 'p', text: 'Its operating businesses and offerings may include Farmreach OS, Farminsta OS, consulting and transformation services, technology systems, data and intelligence solutions, and related services.' },
        { type: 'p', text: 'The website may contain information about products, services, capabilities, projects, partnerships and areas of work.' }
      ]
    },
    {
      id: 'acceptable-use',
      number: '2',
      heading: 'Acceptable Use',
      blocks: [
        { type: 'p', text: 'Users may use the website only for lawful purposes.' },
        { type: 'p', text: 'Users must not:' },
        {
          type: 'ul',
          items: [
            'Use the website for unlawful, fraudulent or deceptive purposes.',
            'Attempt to gain unauthorised access to systems, accounts or infrastructure.',
            'Introduce malicious code, malware, viruses or harmful software.',
            'Interfere with the availability, security or operation of the website.',
            'Scrape, copy or systematically extract website content without permission.',
            'Misrepresent identity or affiliation.',
            'Use Farmreach branding or content in a way that implies unauthorised endorsement.',
            'Attempt to access information belonging to another user or organisation.',
            'Use the website to violate intellectual-property, privacy or other legal rights.'
          ]
        }
      ]
    },
    {
      id: 'website-content',
      number: '3',
      heading: 'Website Content',
      blocks: [
        { type: 'p', text: 'Farmreach makes reasonable efforts to maintain accurate and current information.' },
        { type: 'p', text: 'However, website content may be updated, modified, corrected or withdrawn without notice.' },
        { type: 'p', text: 'Information published on the website is provided for general informational purposes and does not constitute:' },
        {
          type: 'ul',
          items: [
            'Legal advice',
            'Financial advice',
            'Investment advice',
            'Agricultural advice for a specific farm or crop',
            'A guarantee of business results',
            'A commitment to deliver a particular product or feature'
          ]
        },
        { type: 'p', text: 'Product capabilities, implementation timelines, metrics, examples and descriptions may vary by engagement, geography, configuration and customer requirements.' }
      ]
    },
    {
      id: 'product-and-service-information',
      number: '4',
      heading: 'Product and Service Information',
      blocks: [
        { type: 'p', text: 'Descriptions of Farmreach OS, Farminsta OS, consulting services and other capabilities are indicative unless incorporated into a separate written agreement.' },
        { type: 'p', text: 'No website statement creates an obligation to provide a product, feature, integration, implementation timeline, service level or commercial term unless expressly agreed in writing.' },
        { type: 'p', text: 'Commercial terms, scope, implementation obligations, service levels, data responsibilities and intellectual-property rights will be governed by the applicable customer agreement, statement of work, order form or other written contract.' }
      ]
    },
    {
      id: 'intellectual-property',
      number: '5',
      heading: 'Intellectual Property',
      blocks: [
        { type: 'p', text: 'Unless otherwise stated, the website and its contents are owned by or licensed to Farmreach.' },
        { type: 'p', text: 'This includes:' },
        {
          type: 'ul',
          items: [
            'Text', 'Logos', 'Brand names', 'Visual identity', 'Graphics', 'Software',
            'Website design', 'Documentation', 'Product names', 'Databases',
            'Original materials', 'Other proprietary content'
          ]
        },
        { type: 'p', text: 'Users may view and access the content for legitimate informational purposes.' },
        { type: 'p', text: 'No right, title or licence is granted to reproduce, modify, distribute, publish, commercially exploit or create derivative works from Farmreach intellectual property except with written permission or where permitted by applicable law.' }
      ]
    },
    {
      id: 'third-party-links',
      number: '6',
      heading: 'Third-Party Links',
      blocks: [
        { type: 'p', text: 'The website may contain links to third-party websites including partner websites, social-media platforms, Xpedition Labs, Farminsta and other external resources.' },
        { type: 'p', text: 'Farmreach does not control third-party websites and is not responsible for their content, security, privacy practices or availability.' },
        { type: 'p', text: 'Use of third-party websites is subject to their respective terms and policies.' }
      ]
    },
    {
      id: 'submissions-and-enquiries',
      number: '7',
      heading: 'Submissions and Enquiries',
      blocks: [
        { type: 'p', text: 'Information submitted through the Contact page or other enquiry channels may be used to respond to the enquiry, evaluate business requirements and maintain appropriate business records.' },
        { type: 'p', text: 'Users should not submit confidential, highly sensitive or proprietary information through a public website form unless specifically requested and appropriate safeguards have been established.' },
        { type: 'p', text: 'Submission of an enquiry does not create a client relationship, confidentiality obligation or contractual relationship unless separately agreed.' }
      ]
    },
    {
      id: 'confidential-information',
      number: '8',
      heading: 'Confidential Information',
      blocks: [
        { type: 'p', text: 'Website visitors should not treat public website communications as a confidential channel.' },
        { type: 'p', text: 'Confidentiality obligations between Farmreach and another party should be established through an appropriate NDA, confidentiality clause or written agreement.' }
      ]
    },
    {
      id: 'disclaimer',
      number: '9',
      heading: 'Disclaimer',
      blocks: [
        { type: 'p', text: 'To the maximum extent permitted by applicable law, Farmreach provides the website and general website information on an “as available” basis.' },
        { type: 'p', text: 'Farmreach does not guarantee that the website will always be uninterrupted, error-free, secure or available.' },
        { type: 'p', text: 'Nothing in these Terms excludes liability that cannot lawfully be excluded under applicable Indian law.' }
      ]
    },
    {
      id: 'limitation-of-liability',
      number: '10',
      heading: 'Limitation of Liability',
      blocks: [
        { type: 'p', text: 'To the extent permitted by law, Farmreach shall not be responsible for indirect, incidental, consequential, special or punitive losses arising solely from use of the public website.' },
        { type: 'p', text: 'Nothing in these Terms limits liability where such limitation is prohibited by applicable law.' },
        { type: 'p', text: 'Any limitation applicable to a specific customer engagement will be governed by the relevant written agreement.' }
      ]
    },
    {
      id: 'indemnity',
      number: '11',
      heading: 'Indemnity',
      blocks: [
        { type: 'p', text: 'To the extent permitted by applicable law, a user may be responsible for losses or claims arising from their unlawful use of the website, violation of these Terms, infringement of third-party rights or misuse of Farmreach systems.' },
        { type: 'p', text: 'Any contractual indemnity between Farmreach and a customer will be governed by the applicable agreement.' }
      ]
    },
    {
      id: 'changes-to-these-terms',
      number: '12',
      heading: 'Changes to These Terms',
      blocks: [
        { type: 'p', text: 'Farmreach may update these Terms from time to time.' },
        { type: 'p', text: 'The updated version will be published on this page with the revised effective date.' },
        { type: 'p', text: 'Continued use of the website following publication of updated Terms constitutes acceptance to the extent permitted by law.' }
      ]
    },
    {
      id: 'governing-law',
      number: '13',
      heading: 'Governing Law',
      blocks: [
        { type: 'p', text: 'These Terms shall be governed by the laws of India.' },
        { type: 'p', text: 'Subject to any specific dispute-resolution provisions contained in a separate written agreement, courts having appropriate jurisdiction in Hyderabad, Telangana shall have jurisdiction over matters arising from use of the website.' }
      ]
    },
    {
      id: 'contact',
      number: '14',
      heading: 'Contact',
      blocks: [
        { type: 'p', text: 'For questions relating to these Terms:' },
        { type: 'address' }
      ]
    }
  ]
};

export const PRIVACY = {
  path: '/privacy',
  title: 'Privacy & Data Protection Policy',
  eyebrow: 'Legal',
  meta: {
    title: 'Privacy & Data Protection Policy — Farmreach Technologies',
    description:
      'How Farmreach Technologies Pvt Ltd collects, uses, stores, discloses, protects and otherwise processes personal data in connection with farmreach.in and related interactions.'
  },
  effective: UPDATED,
  updated: UPDATED,
  reviewNote: REVIEW_NOTE,
  intro: [
    'Farmreach Technologies Pvt Ltd respects the privacy of individuals whose personal data it processes.',
    'This Privacy & Data Protection Policy explains how Farmreach may collect, use, store, disclose, protect and otherwise process personal data in connection with farmreach.in and related interactions.',
    'For platform customers and enterprise engagements, additional data-processing terms may apply through contracts, data-processing agreements, statements of work or customer-specific policies.',
    'This policy should be read together with applicable contractual documents where relevant.',
    'Farmreach’s role in relation to personal data depends on the particular processing activity and relationship: in some cases it determines the purposes and means of processing for its own business purposes, and in others it processes personal data on behalf of a customer under that customer’s instructions. This policy addresses processing in connection with the public website; personal data processed within enterprise customer platforms is governed by the applicable customer agreement and data-processing terms.'
  ],
  sections: [
    {
      id: 'scope',
      number: '1',
      heading: 'Scope',
      blocks: [
        { type: 'p', text: 'This policy applies to personal data collected through:' },
        {
          type: 'ul',
          items: [
            'farmreach.in',
            'Contact and enquiry forms',
            'Careers and recruitment interactions',
            'Business communications',
            'Events and meetings',
            'Partner interactions',
            'Other Farmreach-controlled digital channels covered by this policy'
          ]
        },
        { type: 'p', text: 'Where Farmreach processes personal data on behalf of a customer through an enterprise platform, the customer may determine the purposes and means of processing. In such circumstances, Farmreach’s role, responsibilities and data-processing obligations will be defined by the applicable customer agreement and data-processing terms.' }
      ]
    },
    {
      id: 'types-of-personal-data',
      number: '2',
      heading: 'Types of Personal Data',
      blocks: [
        { type: 'p', text: 'Depending on the interaction, Farmreach may process:' },
        { type: 'h3', text: 'Identity information' },
        { type: 'ul', items: ['Name', 'Professional designation', 'Organisation'] },
        { type: 'h3', text: 'Contact information' },
        { type: 'ul', items: ['Work email', 'Phone number', 'Business address', 'Communication details'] },
        { type: 'h3', text: 'Professional information' },
        { type: 'ul', items: ['Organisation', 'Role', 'Industry', 'Business requirements', 'Professional profile information voluntarily provided'] },
        { type: 'h3', text: 'Enquiry information' },
        { type: 'ul', items: ['Enquiry route', 'State or region', 'Description of business requirement', 'Information voluntarily included in communications'] },
        { type: 'h3', text: 'Technical information' },
        { type: 'ul', items: ['IP address', 'Browser type', 'Device information', 'Operating system', 'Approximate location derived from technical information', 'Website usage information', 'Log and security information'] },
        { type: 'h3', text: 'Recruitment information, where applicable' },
        { type: 'ul', items: ['CV/resume', 'Professional history', 'Qualifications', 'Skills', 'Application information'] },
        { type: 'p', text: 'Farmreach will seek to avoid collecting unnecessary personal data through public website forms.' }
      ]
    },
    {
      id: 'how-data-is-collected',
      number: '3',
      heading: 'How Data Is Collected',
      blocks: [
        { type: 'p', text: 'Personal data may be collected:' },
        {
          type: 'ul',
          items: [
            'Directly from the individual',
            'Through website forms',
            'Through business correspondence',
            'During meetings and events',
            'Through recruitment applications',
            'Through business partners',
            'Through publicly available professional information',
            'Automatically through website technologies such as cookies or server logs'
          ]
        }
      ]
    },
    {
      id: 'purposes-of-processing',
      number: '4',
      heading: 'Purposes of Processing',
      blocks: [
        { type: 'p', text: 'Farmreach may process personal data for purposes including:' },
        {
          type: 'ul',
          items: [
            'Responding to enquiries',
            'Communicating with prospective customers',
            'Understanding business requirements',
            'Providing requested information',
            'Managing customer and partner relationships',
            'Delivering contracted services',
            'Operating and securing digital platforms',
            'Providing technical support',
            'Managing user accounts where applicable',
            'Managing recruitment',
            'Maintaining business and operational records',
            'Preventing fraud and misuse',
            'Protecting systems and information',
            'Complying with applicable legal obligations',
            'Improving services and website functionality',
            'Conducting internal analysis and operational planning',
            'Communicating relevant business information where permitted'
          ]
        },
        { type: 'p', text: 'Farmreach will seek to process personal data only for legitimate and appropriate purposes.' }
      ]
    },
    {
      id: 'consent-and-other-lawful-bases',
      number: '5',
      heading: 'Consent and Other Lawful Bases',
      blocks: [
        { type: 'p', text: 'Where consent is required under applicable law, Farmreach will obtain consent in an appropriate manner.' },
        { type: 'p', text: 'Depending on the processing activity, processing may also occur where permitted or required by applicable law, including for contractual, legal, security, operational or other recognised purposes.' },
        { type: 'p', text: 'Where applicable, consent may be withdrawn through an appropriate mechanism.' },
        { type: 'p', text: 'Withdrawal of consent does not affect processing already carried out lawfully before withdrawal.' }
      ]
    },
    {
      id: 'cookies-and-similar-technologies',
      number: '6',
      heading: 'Cookies and Similar Technologies',
      blocks: [
        { type: 'p', text: 'Farmreach may use cookies and similar technologies for:' },
        {
          type: 'ul',
          items: ['Essential website functionality', 'Security', 'Preferences', 'Analytics', 'Performance measurement', 'Understanding website usage']
        },
        { type: 'p', text: 'Where consent is required for non-essential cookies, appropriate controls should be provided.' },
        { type: 'p', text: 'Users may also manage cookies through browser settings, although disabling certain cookies may affect website functionality.' }
      ]
    },
    {
      id: 'data-sharing',
      number: '7',
      heading: 'Data Sharing',
      blocks: [
        { type: 'p', text: 'Farmreach may share personal data where reasonably necessary with:' },
        {
          type: 'ul',
          items: [
            'Employees and authorised personnel',
            'Technology and infrastructure providers',
            'Cloud service providers',
            'Communication and email service providers',
            'Professional advisers',
            'Legal, audit and compliance advisers',
            'Service providers working under appropriate contractual obligations',
            'Government or regulatory authorities where legally required',
            'Business partners where necessary for a stated purpose and permitted by law'
          ]
        },
        { type: 'p', text: 'Farmreach does not sell personal data as a business asset.' }
      ]
    },
    {
      id: 'customer-data',
      number: '8',
      heading: 'Customer Data',
      blocks: [
        { type: 'p', text: 'Enterprise customers may provide Farmreach with personal data relating to farmers, employees, field officers, channel partners, suppliers or other individuals.' },
        { type: 'p', text: 'In such cases, the customer may be responsible for determining the purpose and lawful basis of processing.' },
        { type: 'p', text: 'Farmreach will process customer-provided personal data in accordance with applicable law and the relevant customer agreement.' },
        { type: 'p', text: 'Customer data may include:' },
        {
          type: 'ul',
          items: [
            'Farmer information',
            'Contact details',
            'Field officer information',
            'Location information',
            'Farm and plot information',
            'Activity records',
            'Transaction or operational records',
            'Images and documents',
            'Communication records',
            'Other data configured by the customer'
          ]
        },
        { type: 'p', text: 'The exact categories and processing activities will depend on the relevant platform and customer implementation.' }
      ]
    },
    {
      id: 'location-and-field-data',
      number: '9',
      heading: 'Location and Field Data',
      blocks: [
        { type: 'p', text: 'Certain Farmreach and Farminsta solutions may process GPS, location, plot, field and activity information.' },
        { type: 'p', text: 'Such information may be used for:' },
        {
          type: 'ul',
          items: [
            'Field activity recording',
            'Territory management',
            'Operational monitoring',
            'Mapping',
            'Agricultural intelligence',
            'Service delivery',
            'Compliance',
            'Analytics',
            'Customer-defined business workflows'
          ]
        },
        { type: 'p', text: 'Location data collected through enterprise platforms is subject to the applicable customer configuration, notices, consent mechanisms and contractual arrangements.' }
      ]
    },
    {
      id: 'data-retention',
      number: '10',
      heading: 'Data Retention',
      blocks: [
        { type: 'p', text: 'Farmreach will retain personal data only for as long as reasonably necessary for the purpose for which it was collected, contractual requirements, legitimate operational needs, security, dispute resolution and applicable legal or regulatory obligations.' },
        { type: 'p', text: 'Retention periods may differ depending on the category and purpose of data.' },
        { type: 'p', text: 'Customer data retention may be governed by the relevant customer agreement.' },
        { type: 'p', text: 'When personal data is no longer required, Farmreach will seek to delete, anonymise or otherwise securely dispose of it, subject to applicable legal, contractual and operational requirements.' }
      ]
    },
    {
      id: 'data-security',
      number: '11',
      heading: 'Data Security',
      blocks: [
        { type: 'p', text: 'Farmreach will implement reasonable and appropriate technical and organisational safeguards designed to protect personal data against:' },
        {
          type: 'ul',
          items: ['Unauthorised access', 'Unauthorised disclosure', 'Accidental loss', 'Destruction', 'Alteration', 'Misuse', 'Unauthorised processing']
        },
        { type: 'p', text: 'Depending on the system and risk profile, safeguards may include:' },
        {
          type: 'ul',
          items: [
            'Access controls',
            'Authentication',
            'Encryption where appropriate',
            'Network and infrastructure controls',
            'Logging and monitoring',
            'Backups',
            'Secure development practices',
            'Vulnerability management',
            'Employee access controls',
            'Incident response procedures',
            'Vendor controls'
          ]
        },
        { type: 'p', text: 'No internet-based system can guarantee absolute security.' }
      ]
    },
    {
      id: 'data-breaches-and-incidents',
      number: '12',
      heading: 'Data Breaches and Incidents',
      blocks: [
        { type: 'p', text: 'Farmreach maintains processes for identifying, investigating and responding to information-security incidents.' },
        { type: 'p', text: 'Where applicable law requires notification of a personal-data breach to affected individuals, customers, authorities or other parties, Farmreach will follow the applicable legal and contractual requirements.' },
        { type: 'p', text: 'Where Farmreach processes customer data on behalf of a customer, notification responsibilities and timelines may be further defined in the relevant customer agreement or data-processing terms.' }
      ]
    },
    {
      id: 'data-subject-rights',
      number: '13',
      heading: 'Data Subject Rights',
      blocks: [
        { type: 'p', text: 'Subject to applicable law, individuals may have rights relating to their personal data, which may include:' },
        {
          type: 'ul',
          items: [
            'Access to information about processing',
            'Access to personal data',
            'Correction of inaccurate or incomplete information',
            'Updating personal data',
            'Erasure where legally applicable',
            'Withdrawal of consent where processing is based on consent',
            'Grievance redressal',
            'Nomination or other rights where provided under applicable law'
          ]
        },
        { type: 'p', text: 'Requests may be submitted to:' },
        { type: 'email' },
        { type: 'p', text: 'Farmreach may need to verify the identity of the requester before processing a request.' },
        { type: 'p', text: 'Certain rights may be subject to legal, contractual, security or other permitted limitations.' }
      ]
    },
    {
      id: 'childrens-data',
      number: '14',
      heading: 'Children’s Data',
      blocks: [
        { type: 'p', text: 'Farmreach’s public website is primarily intended for business and professional audiences.' },
        { type: 'p', text: 'Farmreach does not knowingly seek to collect personal data from children through the public website for purposes that are not permitted by applicable law.' },
        { type: 'p', text: 'Where a Farmreach service involves children or other protected categories of individuals, additional safeguards and customer-specific requirements may apply.' }
      ]
    },
    {
      id: 'international-data-transfers',
      number: '15',
      heading: 'International Data Transfers',
      blocks: [
        { type: 'p', text: 'Farmreach may use cloud, technology and service providers that process information in India or other jurisdictions.' },
        { type: 'p', text: 'Where personal data is transferred outside India, Farmreach will seek to comply with applicable legal, regulatory and contractual requirements relating to such transfers.' },
        { type: 'p', text: 'Customer-specific data-location requirements may be addressed through the applicable customer agreement.' }
      ]
    },
    {
      id: 'third-party-service-providers',
      number: '16',
      heading: 'Third-Party Service Providers',
      blocks: [
        { type: 'p', text: 'Farmreach may use third-party providers for services such as:' },
        {
          type: 'ul',
          items: ['Cloud hosting', 'Email delivery', 'Analytics', 'Security', 'Communications', 'Infrastructure', 'Recruitment', 'Website functionality']
        },
        { type: 'p', text: 'Such providers may process information on Farmreach’s behalf where necessary for the relevant service.' },
        { type: 'p', text: 'Farmreach will seek to maintain appropriate contractual and security controls for relevant providers.' }
      ]
    },
    {
      id: 'business-transfers',
      number: '17',
      heading: 'Business Transfers',
      blocks: [
        { type: 'p', text: 'If Farmreach undergoes a merger, acquisition, restructuring, financing, sale of assets or similar transaction, personal data may be transferred as part of the transaction where legally permitted.' },
        { type: 'p', text: 'Any such transfer will remain subject to applicable privacy and data-protection obligations.' }
      ]
    },
    {
      id: 'links-to-other-websites',
      number: '18',
      heading: 'Links to Other Websites',
      blocks: [
        { type: 'p', text: 'Farmreach may link to third-party websites including:' },
        {
          type: 'ul',
          items: ['Farminsta', 'Xpedition Labs', 'LinkedIn', 'Facebook', 'Partner websites', 'Government or institutional websites']
        },
        { type: 'p', text: 'Farmreach is not responsible for the privacy practices of those external websites.' },
        { type: 'p', text: 'Users should review the privacy policies applicable to those websites.' }
      ]
    },
    {
      id: 'marketing-communications',
      number: '19',
      heading: 'Marketing Communications',
      blocks: [
        { type: 'p', text: 'Where permitted by applicable law, Farmreach may send relevant business communications to individuals who have requested information, engaged with Farmreach or otherwise have a legitimate business relationship.' },
        { type: 'p', text: 'Where consent is required, Farmreach will seek appropriate consent.' },
        { type: 'p', text: 'Recipients may request cessation of non-essential marketing communications.' }
      ]
    },
    {
      id: 'government-and-enterprise-data',
      number: '20',
      heading: 'Government and Enterprise Data',
      blocks: [
        { type: 'p', text: 'Farmreach may operate systems for government departments, public institutions and enterprise customers.' },
        { type: 'p', text: 'The privacy responsibilities for data processed within such systems may be distributed between Farmreach and the relevant customer according to the applicable law and contractual arrangement.' },
        { type: 'p', text: 'The customer may establish specific:' },
        {
          type: 'ul',
          items: [
            'Data collection requirements',
            'Consent mechanisms',
            'Retention periods',
            'Access controls',
            'User roles',
            'Data-sharing rules',
            'Data residency requirements',
            'Security requirements',
            'Deletion requirements'
          ]
        },
        { type: 'p', text: 'Such requirements may be documented through customer agreements, implementation specifications or data-processing agreements.' }
      ]
    },
    {
      id: 'data-processing-agreements',
      number: '21',
      heading: 'Data Processing Agreements',
      blocks: [
        { type: 'p', text: 'For enterprise customers where Farmreach processes personal data on behalf of the customer, the parties may enter into a Data Processing Agreement or equivalent contractual provisions.' },
        { type: 'p', text: 'Such agreements may define:' },
        {
          type: 'ul',
          items: [
            'Subject matter of processing',
            'Duration',
            'Nature and purpose',
            'Categories of personal data',
            'Categories of data principals',
            'Processing instructions',
            'Security obligations',
            'Sub-processors',
            'Data breach procedures',
            'Retention and deletion',
            'Audit or assurance mechanisms',
            'Data-subject assistance',
            'International transfer requirements'
          ]
        },
        { type: 'p', text: 'The applicable customer agreement will prevail where it contains more specific contractual requirements.' }
      ]
    },
    {
      id: 'changes-to-this-policy',
      number: '22',
      heading: 'Changes to This Policy',
      blocks: [
        { type: 'p', text: 'Farmreach may update this Privacy & Data Protection Policy periodically to reflect:' },
        {
          type: 'ul',
          items: [
            'Changes in law',
            'Regulatory developments',
            'Changes in services',
            'Changes in technology',
            'Changes in data-processing practices',
            'Security or operational improvements'
          ]
        },
        { type: 'p', text: 'The updated policy will be published on this page with a revised effective date.' }
      ]
    },
    {
      id: 'grievance-privacy-contact',
      number: '23',
      heading: 'Grievance / Privacy Contact',
      blocks: [
        { type: 'p', text: 'For privacy questions, data requests or concerns, contact:' },
        { type: 'address' },
        { type: 'note', text: 'If Farmreach formally designates a Data Protection Officer or Grievance Officer, their details should be added here before publication.' }
      ]
    },
    {
      id: 'governing-law',
      number: '24',
      heading: 'Governing Law',
      blocks: [
        { type: 'p', text: 'This policy shall be interpreted in accordance with applicable laws of India.' },
        { type: 'p', text: 'Where a specific customer agreement contains additional privacy or data-processing provisions, those provisions will apply to the relevant customer relationship to the extent permitted by law.' }
      ]
    }
  ]
};
