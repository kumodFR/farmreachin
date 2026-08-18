/* Recognition entries. Nothing here is invented: a year, citation or photograph
   stays a marked placeholder (`year: ''`, `photo: null`, `pending: true`) until
   Farmreach supplies it. `photoNote` is the caption shown in an empty frame. */

export const RECOGNITION = {
  hero: {
    title: 'Recognition along the journey',
    lede: 'Recognition for the work we have built and operated across agricultural technology, rural markets and digital transformation.'
  },
  entries: [
    {
      id: 'hysea-10x',
      year: '2020',
      title: 'HYSEA 10X Product Awards',
      subtitle: 'Recognised among innovative technology products',
      narration:
        "Farmreach was recognised through the HYSEA 10X Product Awards for its work in building technology solutions for agriculture. The recognition was presented by the Hon'ble Chief Minister of Telangana at the time, marking an important milestone in Farmreach's technology journey.",
      photo: '/assets/img/recognition/hysea-10x-2020.jpg',
      photoAlt: 'Farmreach Technologies receiving the HYSEA 10X Product Awards recognition on stage',
      photoNote: 'Event photograph to be supplied'
    },
    {
      id: 'champions-rural-markets',
      year: '2023',
      title: 'Champions of Rural Markets',
      subtitle: 'The Economic Times \u00b7 Mumbai',
      narration:
        "Farmreach was recognised by The Economic Times at the Champions of Rural Markets programme in Mumbai for its work in connecting technology, rural markets and agricultural ecosystems. The recognition reflected the company's focus on building practical systems for India's rural and agricultural economy.",
      photo: '/assets/img/recognition/et-champions-rural-markets.jpg',
      photoAlt: 'Farmreach Technologies receiving The Economic Times Champions of Rural Markets recognition on stage in Mumbai',
      photoNote: 'Event photograph to be supplied'
    },
    {
      id: 'recognition-03',
      year: '',
      title: '',
      subtitle: '',
      narration: '',
      photo: null,
      photoNote: 'Photograph to be supplied',
      pending: true
    }
  ]
};
