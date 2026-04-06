export interface RegistrationData {
  name: string;
  email: string;
  program: string;
}

export interface ContactData {
  name: string;
  email: string;
  message: string;
}

export interface SponsorData {
  companyName: string;
  contactName: string;
  email: string;
  tier: string;
}

export interface VolunteerData {
  name: string;
  email: string;
  role: string;
  message: string;
}

export interface DonationData {
  amount: number;
  name: string;
  email: string;
}

export const registerForProgram = async (data: RegistrationData) => {
  const response = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const sendContactMessage = async (data: ContactData) => {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const sendSponsorshipInquiry = async (data: SponsorData) => {
  const response = await fetch("/api/sponsor", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const submitVolunteerApplication = async (data: VolunteerData) => {
  const response = await fetch("/api/volunteer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const processDonation = async (data: DonationData) => {
  const response = await fetch("/api/donate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const checkHealth = async () => {
  const response = await fetch("/api/health");
  return response.json();
};
