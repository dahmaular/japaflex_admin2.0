import React, { useEffect } from "react";
import StatCard from "../../../components/StatCard/StatCard";
import UserChart from "../../../components/UserChart/UserChart";
import DoughnutChart from "../../../components/DoughnutChart/DoughnutChart";
import AgeBars from "../../../components/AgeBars/AgeBars";
import ContentList from "../../../components/ContentList/ContentList";
import { Flag, Volume2, AlertTriangle } from 'lucide-react';
import styles from "./Analytics.module.css";

const statCards = [
  { label: "Flagged Posts", value: 120, percent: 12, icon: Flag },
  { label: "Muted Users", value: 45, percent: -5, icon: Volume2 },
  { label: "Total Reported Post", value: 300, percent: 8, icon: AlertTriangle },
];

const userTrendData = [
  { name: "Mon", active: 120, inactive: 30 },
  { name: "Tue", active: 150, inactive: 40 },
  { name: "Wed", active: 170, inactive: 35 },
  { name: "Thu", active: 140, inactive: 50 },
  { name: "Fri", active: 200, inactive: 60 },
  { name: "Sat", active: 180, inactive: 55 },
  { name: "Sun", active: 210, inactive: 45 },
];

const doughnutData = [
  { name: "Male", value: 64, color: "#2563eb" },
  { name: "Female", value: 36, color: "#fb923c" },
];

const ageData = [
  { label: "16–20", value: 20 },
  { label: "21–35", value: 40 },
  { label: "36–40", value: 18 },
  { label: "40–45", value: 12 },
  { label: "45–Above", value: 10 },
];

const posts = [
  {
    id: "1",
    thumbnail: "https://source.unsplash.com/random/48x48?sig=1",
    username: "user_one",
    date: "2025-06-17",
    likes: 120,
    comments: 45,
    shares: 10,
    views: 500,
  },
  {
    id: "2",
    thumbnail: "https://source.unsplash.com/random/48x48?sig=2",
    username: "user_two",
    date: "2025-06-16",
    likes: 98,
    comments: 30,
    shares: 8,
    views: 420,
  },
  {
    id: "3",
    thumbnail: "https://source.unsplash.com/random/48x48?sig=3",
    username: "user_three",
    date: "2025-06-15",
    likes: 150,
    comments: 60,
    shares: 15,
    views: 600,
  },
];

const AnalyticsPage: React.FC = () => {
  useEffect(() => {
    console.log("Analytics page mounted");
  }, []);

  return (
    <div className={styles.analyticsContainer}>
      {/* Debug Info */}
      <div style={{
        background: '#f0f9ff',
        border: '1px solid #93c5fd',
        padding: '12px',
        marginBottom: '16px',
        borderRadius: '6px',
        color: '#1e40af',
        fontFamily: 'monospace'
      }}>
        Analytics Page Loaded
      </div>

      <div className={styles.statsRow}>
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.chartsColumn}>
          <div className={styles.chartWrapper}>
            <UserChart data={userTrendData} />
          </div>
          <div className={styles.chartWrapper}>
            <AgeBars data={ageData} />
          </div>
        </div>

        <div className={styles.sideCol}>
          <div className={styles.chartWrapper}>
            <DoughnutChart
              data={doughnutData}
              centerLabel="Male"
              centerValue="64%"
            />
          </div>
          <div className={styles.chartWrapper}>
            <ContentList posts={posts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
