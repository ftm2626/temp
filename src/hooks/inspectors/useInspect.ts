import React, { useState } from "react";

export default function useInspect() {
  const [showModal, setShowModal] = useState(0);
  const data = [
    {
      id: 1,
      title: "وضعیت راننده",
      info: [
        {
          id: 1,
          question:
            "آیا وضعیت ظاهری راننده مناسب و فاقد هر گونه مد خارج از عرف و نامناسب است ؟ ( موی سر و صورت ، لباس و کفش ، خالکوبی و تتو)",
          score: 5,
          status: false,
        },
        {
          id: 2,
          question:
            "آیا راننده فاقد هر گونه بوی نامطبوع ، لک و کثیفی رو لباس می باشد ؟",
          score: 5,
          status: false,
        },
        {
          id: 3,
          question: "آیا خودرو دارای معاینه فنی با تاریخ معتبر است؟",
          score: 5,
          status: false,
        },
        {
          id: 4,
          question:
            "آیا راننده همکاری لازم را در مکان و زمان بازرسی با بازرس انجام داده است ؟",
          score: 5,
          status: false,
        },
      ],
    },
    {
      id: 2,
      title: "نظافت خارجی",
      info: [
        {
          id: 1,
          question: "آیا خارج خودرو تمیز و فاقد آثار کثیفی می باشد ؟",
          score: 5,
          status: false,
        },
      ],
    },
  ];

  return { data, showModal, setShowModal };
}
