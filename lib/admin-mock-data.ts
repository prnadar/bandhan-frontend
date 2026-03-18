/**
 * Comprehensive mock data for the Admin Dashboard.
 * Used as fallback when API returns errors.
 */

// ── Types ──────────────────────────────────────────────────────────────────

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  religion: string;
  caste: string;
  age: number;
  gender: "Male" | "Female";
  status: "active" | "suspended" | "banned" | "pending";
  subscription: "Free" | "Silver" | "Gold" | "Diamond";
  joined: string;
  lastActive: string;
  photo: string;
  bio: string;
  education: string;
  occupation: string;
  income: string;
  height: string;
  motherTongue: string;
  maritalStatus: string;
  manglik: string;
  familyType: string;
  fatherOccupation: string;
  motherOccupation: string;
  siblings: string;
  gotra: string;
  state: string;
}

export interface AdminPhoto {
  id: string;
  userId: string;
  userName: string;
  url: string;
  status: "pending" | "approved" | "rejected" | "flagged";
  uploadedAt: string;
  flagCount: number;
}

export interface AdminMatch {
  id: string;
  userA: { id: string; name: string; photo: string; city: string };
  userB: { id: string; name: string; photo: string; city: string };
  matchedAt: string;
  status: "active" | "unmatched";
  compatibility: number;
}

export interface AdminMessage {
  id: string;
  fromUser: { id: string; name: string; photo: string };
  toUser: { id: string; name: string; photo: string };
  lastMessage: string;
  messageCount: number;
  lastAt: string;
  flagged: boolean;
}

export interface AdminSubscription {
  id: string;
  userId: string;
  userName: string;
  plan: "Free" | "Silver" | "Gold" | "Diamond";
  startDate: string;
  expiryDate: string;
  amountPaid: number;
  status: "active" | "expired" | "cancelled";
  gateway: "Razorpay" | "Stripe";
}

export interface AdminPayment {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  plan: string;
  gateway: "Razorpay" | "Stripe";
  status: "success" | "failed" | "refunded";
  date: string;
  transactionId: string;
}

export interface AdminReport {
  id: string;
  reporter: { id: string; name: string };
  reportedUser: { id: string; name: string; photo: string };
  reason: string;
  description: string;
  date: string;
  status: "pending" | "resolved" | "dismissed";
  notes: string;
}

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  type: "push" | "email" | "in-app";
  target: string;
  sentAt: string;
  sentBy: string;
  deliveredCount: number;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers30d: number;
  newToday: number;
  pendingApproval: number;
  totalMatches: number;
  messagesSent: number;
  activeSubscriptions: number;
  revenueMTD: number;
}

// ── Generators ─────────────────────────────────────────────────────────────

const cities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune", "Kolkata", "Ahmedabad", "Jaipur", "Lucknow", "Chandigarh", "Indore", "Surat", "Nagpur", "Bhopal"];
const religions = ["Hindu", "Muslim", "Sikh", "Christian", "Jain", "Buddhist", "Parsi"];
const castes: Record<string, string[]> = {
  Hindu: ["Brahmin", "Kshatriya", "Vaishya", "Kayastha", "Rajput", "Maratha", "Agarwal", "Gupta", "Jat"],
  Muslim: ["Sunni", "Shia", "Pathan", "Syed", "Sheikh"],
  Sikh: ["Jat Sikh", "Khatri", "Ramgarhia", "Arora"],
  Christian: ["Catholic", "Protestant", "Syrian Christian"],
  Jain: ["Digambar", "Shwetambar", "Oswal"],
  Buddhist: ["Mahar", "Neo-Buddhist"],
  Parsi: ["Irani", "Shahenshai"],
};
const educations = ["B.Tech", "MBA", "MBBS", "CA", "B.Com", "M.Tech", "PhD", "BBA", "LLB", "B.Sc", "M.Sc", "B.Arch"];
const occupations = ["Software Engineer", "Doctor", "CA", "Business Owner", "Lawyer", "Teacher", "Bank Manager", "Government Officer", "Architect", "Data Scientist", "Marketing Manager", "Civil Engineer"];
const incomes = ["3-5 LPA", "5-8 LPA", "8-12 LPA", "12-20 LPA", "20-30 LPA", "30-50 LPA", "50+ LPA"];
const statuses: AdminUser["status"][] = ["active", "active", "active", "active", "pending", "suspended", "banned"];
const subscriptions: AdminUser["subscription"][] = ["Free", "Free", "Free", "Silver", "Silver", "Gold", "Diamond"];
const maleNames = ["Arjun Sharma", "Rahul Gupta", "Vikram Patel", "Aditya Singh", "Karan Mehta", "Rohit Kumar", "Nikhil Jain", "Siddharth Verma", "Aman Chauhan", "Prashant Reddy", "Deepak Mishra", "Manish Agarwal", "Suresh Nair", "Rajesh Iyer", "Varun Kapoor", "Harsh Trivedi", "Gaurav Thakur", "Ankit Saxena", "Vivek Bhatt", "Pranav Deshmukh", "Amit Tiwari", "Kunal Shah", "Sameer Khanna", "Tarun Bhatia", "Mohit Joshi"];
const femaleNames = ["Priya Sharma", "Ananya Gupta", "Kavya Patel", "Ishita Singh", "Pooja Mehta", "Sneha Kumar", "Riya Jain", "Nisha Verma", "Divya Chauhan", "Meera Reddy", "Swati Mishra", "Neha Agarwal", "Lakshmi Nair", "Anjali Iyer", "Shruti Kapoor", "Tanvi Trivedi", "Aditi Thakur", "Pallavi Saxena", "Sonal Bhatt", "Radhika Deshmukh", "Preeti Tiwari", "Komal Shah", "Sonali Khanna", "Richa Bhatia", "Deepika Joshi"];
const states = ["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Telangana", "Gujarat", "Rajasthan", "Uttar Pradesh", "West Bengal", "Punjab", "Madhya Pradesh"];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(start: string, end: string): string {
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  return new Date(s + Math.random() * (e - s)).toISOString().split("T")[0];
}

function generateUsers(count: number): AdminUser[] {
  const users: AdminUser[] = [];
  for (let i = 1; i <= count; i++) {
    const gender = i % 2 === 0 ? "Female" : "Male";
    const name = gender === "Male" ? maleNames[i % maleNames.length] : femaleNames[i % femaleNames.length];
    const religion = randomFrom(religions);
    const city = randomFrom(cities);
    const age = 22 + Math.floor(Math.random() * 16);
    users.push({
      id: `USR${String(i).padStart(4, "0")}`,
      name,
      email: `${name.toLowerCase().replace(/\s/g, ".")}@gmail.com`,
      phone: `+91 ${9000000000 + Math.floor(Math.random() * 999999999)}`,
      city,
      religion,
      caste: randomFrom(castes[religion] || ["General"]),
      age,
      gender,
      status: randomFrom(statuses),
      subscription: randomFrom(subscriptions),
      joined: randomDate("2024-01-01", "2026-03-18"),
      lastActive: randomDate("2026-02-01", "2026-03-18"),
      photo: `/api/placeholder/120/120`,
      bio: `Looking for a compatible life partner. Based in ${city}, working as a ${randomFrom(occupations)}.`,
      education: randomFrom(educations),
      occupation: randomFrom(occupations),
      income: randomFrom(incomes),
      height: `${5 + Math.floor(Math.random() * 2)}'${Math.floor(Math.random() * 12)}"`,
      motherTongue: religion === "Muslim" ? "Urdu" : religion === "Sikh" ? "Punjabi" : randomFrom(["Hindi", "Marathi", "Tamil", "Telugu", "Kannada", "Bengali", "Gujarati"]),
      maritalStatus: randomFrom(["Never Married", "Never Married", "Never Married", "Divorced", "Widowed"]),
      manglik: religion === "Hindu" ? randomFrom(["Yes", "No", "Don't Know"]) : "N/A",
      familyType: randomFrom(["Joint", "Nuclear"]),
      fatherOccupation: randomFrom(["Retired", "Business", "Government Service", "Private Job"]),
      motherOccupation: randomFrom(["Homemaker", "Teacher", "Doctor", "Business"]),
      siblings: `${Math.floor(Math.random() * 3)} Brother(s), ${Math.floor(Math.random() * 3)} Sister(s)`,
      gotra: religion === "Hindu" ? randomFrom(["Bharadwaj", "Kashyap", "Vashistha", "Gautam", "Sandilya", "Atri"]) : "N/A",
      state: randomFrom(states),
    });
  }
  return users;
}

// ── Exported Mock Data ─────────────────────────────────────────────────────

export const mockUsers: AdminUser[] = generateUsers(60);

export const mockDashboardStats: DashboardStats = {
  totalUsers: 24853,
  activeUsers30d: 18420,
  newToday: 47,
  pendingApproval: 126,
  totalMatches: 8934,
  messagesSent: 142567,
  activeSubscriptions: 3241,
  revenueMTD: 1847500,
};

export const mockRegistrationChart = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 86400000).toISOString().split("T")[0],
  count: 30 + Math.floor(Math.random() * 40),
}));

export const mockMatchesChart = Array.from({ length: 12 }, (_, i) => ({
  week: `W${i + 1}`,
  count: 50 + Math.floor(Math.random() * 80),
}));

export const mockReligionDistribution = [
  { name: "Hindu", value: 62, color: "#E8426A" },
  { name: "Muslim", value: 18, color: "#C9954A" },
  { name: "Sikh", value: 8, color: "#7A9E7E" },
  { name: "Christian", value: 6, color: "#FF8FA3" },
  { name: "Jain", value: 3, color: "#FFD166" },
  { name: "Buddhist", value: 2, color: "#8A7080" },
  { name: "Parsi", value: 1, color: "#FFBDCA" },
];

export const mockRecentActivity = [
  { id: "1", type: "signup" as const, user: "Arjun Sharma", time: "2 min ago", detail: "New registration from Mumbai" },
  { id: "2", type: "approval" as const, user: "Priya Patel", time: "5 min ago", detail: "Profile approved" },
  { id: "3", type: "signup" as const, user: "Kavya Singh", time: "12 min ago", detail: "New registration from Delhi" },
  { id: "4", type: "match" as const, user: "Rahul & Sneha", time: "18 min ago", detail: "New match created" },
  { id: "5", type: "payment" as const, user: "Vikram Mehta", time: "25 min ago", detail: "Gold plan purchased - ₹4,999" },
  { id: "6", type: "signup" as const, user: "Ishita Reddy", time: "32 min ago", detail: "New registration from Hyderabad" },
  { id: "7", type: "approval" as const, user: "Aditya Kumar", time: "40 min ago", detail: "Profile approved" },
  { id: "8", type: "report" as const, user: "Anonymous", time: "1 hr ago", detail: "Fake profile reported" },
  { id: "9", type: "signup" as const, user: "Meera Jain", time: "1.5 hrs ago", detail: "New registration from Jaipur" },
  { id: "10", type: "payment" as const, user: "Karan Gupta", time: "2 hrs ago", detail: "Diamond plan purchased - ₹9,999" },
];

export const mockPhotos: AdminPhoto[] = mockUsers.slice(0, 40).map((u, i) => ({
  id: `PHT${String(i + 1).padStart(4, "0")}`,
  userId: u.id,
  userName: u.name,
  url: `/api/placeholder/200/200`,
  status: randomFrom(["pending", "approved", "approved", "approved", "rejected", "flagged"] as AdminPhoto["status"][]),
  uploadedAt: randomDate("2026-01-01", "2026-03-18"),
  flagCount: Math.floor(Math.random() * 5),
}));

export const mockMatches: AdminMatch[] = Array.from({ length: 30 }, (_, i) => {
  const a = mockUsers[i * 2] || mockUsers[0];
  const b = mockUsers[i * 2 + 1] || mockUsers[1];
  return {
    id: `MTH${String(i + 1).padStart(4, "0")}`,
    userA: { id: a.id, name: a.name, photo: a.photo, city: a.city },
    userB: { id: b.id, name: b.name, photo: b.photo, city: b.city },
    matchedAt: randomDate("2025-06-01", "2026-03-18"),
    status: randomFrom(["active", "active", "active", "unmatched"] as AdminMatch["status"][]),
    compatibility: 60 + Math.floor(Math.random() * 35),
  };
});

export const mockMessages: AdminMessage[] = Array.from({ length: 25 }, (_, i) => {
  const from = mockUsers[i] || mockUsers[0];
  const to = mockUsers[i + 25] || mockUsers[1];
  return {
    id: `MSG${String(i + 1).padStart(4, "0")}`,
    fromUser: { id: from.id, name: from.name, photo: from.photo },
    toUser: { id: to.id, name: to.name, photo: to.photo },
    lastMessage: randomFrom([
      "Hi! I liked your profile, would love to connect.",
      "Thank you for your interest. Let's talk.",
      "My family is also from the same city!",
      "What are your hobbies?",
      "I work in IT, how about you?",
      "Looking forward to hearing from you.",
    ]),
    messageCount: 3 + Math.floor(Math.random() * 50),
    lastAt: randomDate("2026-02-01", "2026-03-18"),
    flagged: Math.random() < 0.1,
  };
});

export const mockSubscriptions: AdminSubscription[] = mockUsers.filter(u => u.subscription !== "Free").map((u, i) => ({
  id: `SUB${String(i + 1).padStart(4, "0")}`,
  userId: u.id,
  userName: u.name,
  plan: u.subscription as AdminSubscription["plan"],
  startDate: randomDate("2025-06-01", "2026-02-01"),
  expiryDate: randomDate("2026-04-01", "2026-12-31"),
  amountPaid: u.subscription === "Silver" ? 1999 : u.subscription === "Gold" ? 4999 : 9999,
  status: randomFrom(["active", "active", "active", "expired", "cancelled"] as AdminSubscription["status"][]),
  gateway: randomFrom(["Razorpay", "Stripe"] as AdminSubscription["gateway"][]),
}));

export const mockPayments: AdminPayment[] = Array.from({ length: 40 }, (_, i) => {
  const u = mockUsers[i % mockUsers.length];
  const plan = randomFrom(["Silver", "Gold", "Diamond"]);
  return {
    id: `PAY${String(i + 1).padStart(4, "0")}`,
    userId: u.id,
    userName: u.name,
    amount: plan === "Silver" ? 1999 : plan === "Gold" ? 4999 : 9999,
    plan,
    gateway: randomFrom(["Razorpay", "Stripe"] as AdminPayment["gateway"][]),
    status: randomFrom(["success", "success", "success", "success", "failed", "refunded"] as AdminPayment["status"][]),
    date: randomDate("2025-06-01", "2026-03-18"),
    transactionId: `TXN${Date.now()}${Math.floor(Math.random() * 9999)}`,
  };
});

export const mockReports: AdminReport[] = Array.from({ length: 15 }, (_, i) => ({
  id: `RPT${String(i + 1).padStart(4, "0")}`,
  reporter: { id: mockUsers[i]?.id || "USR0001", name: mockUsers[i]?.name || "Unknown" },
  reportedUser: {
    id: mockUsers[i + 15]?.id || "USR0016",
    name: mockUsers[i + 15]?.name || "Unknown",
    photo: `/api/placeholder/60/60`,
  },
  reason: randomFrom(["Fake Profile", "Inappropriate Photos", "Harassment", "Spam", "Underage User", "Already Married", "Wrong Information"]),
  description: "This profile appears to contain false information and suspicious activity.",
  date: randomDate("2026-01-01", "2026-03-18"),
  status: randomFrom(["pending", "pending", "resolved", "dismissed"] as AdminReport["status"][]),
  notes: "",
}));

export const mockNotifications: AdminNotification[] = [
  { id: "N1", title: "Welcome Offer", message: "Get 50% off on Gold plan!", type: "push", target: "All Users", sentAt: "2026-03-15", sentBy: "Admin", deliveredCount: 18420 },
  { id: "N2", title: "Profile Reminder", message: "Complete your profile to get more matches", type: "email", target: "Incomplete Profiles", sentAt: "2026-03-12", sentBy: "Admin", deliveredCount: 3240 },
  { id: "N3", title: "New Feature", message: "Try our Kundali matching feature!", type: "in-app", target: "Premium Users", sentAt: "2026-03-10", sentBy: "Admin", deliveredCount: 3241 },
  { id: "N4", title: "Maintenance Notice", message: "Scheduled maintenance on March 20", type: "push", target: "All Users", sentAt: "2026-03-08", sentBy: "Admin", deliveredCount: 24853 },
];

export const mockAnalytics = {
  registrationTrend: Array.from({ length: 90 }, (_, i) => ({
    date: new Date(Date.now() - (89 - i) * 86400000).toISOString().split("T")[0],
    count: 20 + Math.floor(Math.random() * 50),
  })),
  matchSuccessRate: Array.from({ length: 12 }, (_, i) => ({
    month: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"][i],
    rate: 15 + Math.floor(Math.random() * 20),
  })),
  conversionFunnel: [
    { stage: "Visitors", count: 125000 },
    { stage: "Registered", count: 24853 },
    { stage: "Profile Complete", count: 18200 },
    { stage: "First Match", count: 12400 },
    { stage: "Premium Trial", count: 5600 },
    { stage: "Paid", count: 3241 },
  ],
  topCities: [
    { city: "Mumbai", users: 4250 },
    { city: "Delhi", users: 3820 },
    { city: "Bangalore", users: 3100 },
    { city: "Hyderabad", users: 2450 },
    { city: "Chennai", users: 2100 },
    { city: "Pune", users: 1950 },
    { city: "Kolkata", users: 1600 },
    { city: "Ahmedabad", users: 1400 },
    { city: "Jaipur", users: 1200 },
    { city: "Lucknow", users: 980 },
  ],
  ageDistribution: [
    { range: "18-22", count: 2100 },
    { range: "23-25", count: 5400 },
    { range: "26-28", count: 7200 },
    { range: "29-32", count: 5800 },
    { range: "33-35", count: 2400 },
    { range: "36-40", count: 1200 },
    { range: "40+", count: 753 },
  ],
  retention: { d7: 72, d30: 48, d90: 31 },
  revenueOverTime: Array.from({ length: 12 }, (_, i) => ({
    month: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"][i],
    revenue: 800000 + Math.floor(Math.random() * 1200000),
  })),
};

export const mockSettings = {
  site: {
    name: "Match4Marriage",
    tagline: "बंधन · The Sacred Bond",
    maintenanceMode: false,
    registrationOpen: true,
  },
  emailTemplates: [
    { id: "welcome", name: "Welcome Email", subject: "Welcome to Match4Marriage!", body: "Dear {{name}},\n\nWelcome to Match4Marriage..." },
    { id: "otp", name: "OTP Verification", subject: "Your OTP Code", body: "Your OTP is {{otp}}. Valid for 10 minutes." },
    { id: "match", name: "Match Notification", subject: "You have a new match!", body: "Dear {{name}},\n\n{{matchName}} has matched with you..." },
    { id: "interest", name: "Interest Received", subject: "Someone is interested!", body: "Dear {{name}},\n\n{{senderName}} has expressed interest..." },
  ],
  subscriptionPlans: [
    { id: "silver", name: "Silver", price: 1999, duration: 90, features: ["Unlimited Profile Views", "10 Interests/day", "Chat"] },
    { id: "gold", name: "Gold", price: 4999, duration: 180, features: ["Everything in Silver", "Priority Listing", "Kundali Match", "50 Interests/day"] },
    { id: "diamond", name: "Diamond", price: 9999, duration: 365, features: ["Everything in Gold", "Personal Matchmaker", "Profile Boost", "Unlimited Interests"] },
  ],
  moderation: {
    autoApproveProfiles: false,
    photoModeration: true,
    maxPhotos: 8,
    minAge: 18,
  },
  adminUsers: [
    { id: "A1", email: "admin@match4marriage.com", role: "Super Admin", lastLogin: "2026-03-18" },
    { id: "A2", email: "moderator@match4marriage.com", role: "Moderator", lastLogin: "2026-03-17" },
  ],
};
