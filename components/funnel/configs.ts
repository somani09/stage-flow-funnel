export const dummyFunnelData1 = [
  {
    stageId: 1,
    stageConversionName: "Applications Started",
    value: 8000,
  },
  {
    stageId: 2,
    stageConversionName: "Forms Completed",
    value: 6200,
  },

  {
    stageId: 3,
    stageConversionName: "Interviews Scheduled",
    value: 2200,
  },
  {
    stageId: 4,
    stageConversionName: "Final Offers Given",
    value: 1200,
  },
];

export const dummyFunnelData2 = [
  {
    stageId: 1,
    stageConversionName: "Orders Received",
    value: 5000,
  },
  {
    stageId: 2,
    stageConversionName: "Packed & Ready",
    value: 4200,
  },
  {
    stageId: 3,
    stageConversionName: "Out for Delivery",
    value: 3100,
  },
  {
    stageId: 4,
    stageConversionName: "Delivered",
    value: 2900,
  },
];

export const dummyFunnelData3 = [
  {
    stageId: 1,
    stageConversionName: "Invitations Sent",
    value: 100000,
  },
  {
    stageId: 2,
    stageConversionName: "Emails Opened",
    value: 6000,
  },
  {
    stageId: 3,
    stageConversionName: "Survey Started",
    value: 500,
  },

  {
    stageId: 4,
    stageConversionName: "Survey Submitted",
    value: 100,
  },
];

export const aboutConfigs = [
  {
    title: "Application Funnel",
    stages: dummyFunnelData1.length,
    data: dummyFunnelData1,
    description: "Represents job application stages from start to hire.",
  },
  {
    title: "Delivery Funnel",
    stages: dummyFunnelData2.length,
    data: dummyFunnelData2,
    description: "Tracks stages from order received to final delivery.",
  },
  {
    title: "Survey Funnel",
    stages: dummyFunnelData3.length,
    data: dummyFunnelData3,
    description: "Visualizes user engagement throughout a survey flow.",
  },
];
