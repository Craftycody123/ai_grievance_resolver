import React, { useEffect, useState, useContext } from "react";
import DashboardUI from "../components/Dashboard";
import { ApiContext } from "../App";
import { AuthContext } from "../context/AuthContext";
import "../styles/components.css";

const Dashboard = () => {
  const { apiRequest } = useContext(ApiContext);
  const { profile } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const grievances = await apiRequest("/grievances");

      const total = grievances.length;

      const resolved = grievances.filter(g => g.status === "Resolved").length;
      const inProgress = grievances.filter(g => g.status === "In Progress").length;
      const pending = grievances.filter(g => g.status === "Pending").length;

      const escalated = grievances.filter(
        g => g.priority === "High" && g.status !== "Resolved"
      ).length;

      /* =====================
         DEPARTMENT PERFORMANCE
      ====================== */
      const deptMap = {};

      grievances.forEach(g => {
        if (!deptMap[g.department]) {
          deptMap[g.department] = {
            name: g.department,
            total: 0,
            resolved: 0
          };
        }
        deptMap[g.department].total += 1;
        if (g.status === "Resolved") {
          deptMap[g.department].resolved += 1;
        }
      });

      const departmentPerformance = Object.values(deptMap).map(d => ({
        name: d.name,
        resolutionRate: d.total
          ? Math.round((d.resolved / d.total) * 100)
          : 0,
        avgTime: "—",
        totalComplaints: d.total
      }));

      /* =====================
         ANALYTICS (BASIC)
      ====================== */
      const analyticsData = {
        complaintTrends: [],
        resolutionTimes: departmentPerformance.map(d => ({
          department: d.name,
          avgDays: d.avgTime
        })),
        topCategories: departmentPerformance.map(d => ({
          category: d.name,
          count: d.totalComplaints,
          trend: "—"
        })),
        sentimentAnalysis: {
          positive: 40,
          neutral: 40,
          negative: 20
        }
      };

      /* =====================
         RECENT ACTIVITIES
      ====================== */
      const recentActivities = grievances
        .slice(-5)
        .reverse()
        .map((g, idx) => ({
          id: idx,
          action:
            g.status === "Resolved"
              ? "Complaint resolved"
              : g.status === "In Progress"
              ? "Complaint in progress"
              : "New complaint submitted",
          department: g.department,
          time: "Recently",
          priority: g.priority
        }));

      setStats({
        total,
        resolved,
        inProgress,
        pending,
        escalated,
        analytics: analyticsData,
        departmentPerformance,
        recentActivities
      });

      setLoading(false);
    } catch (err) {
      console.error("Dashboard fetch failed", err);
      setLoading(false);
    }
  };

  if (loading) {
    return <p style={{ padding: "2rem" }}>Loading dashboard...</p>;
  }

  return <DashboardUI stats={stats} />;
};

export default Dashboard;
