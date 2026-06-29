import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Flame, Plus, TrendingUp, Lock, AlertCircle } from "lucide-react";
import BaseLayout from "../../Layout/BaseLayout";
import SnippetCard from "../../components/SnippetCard/SnippetCard";
import EmptyState from "../../components/EmptyState/EmptyState";
import {
  MyCard,
  MyCardHeader,
  MyCardTitle,
  MyCardContent,
} from "../../components/MyCard/MyCard";
import MyButton from "../../components/MyButton/MyButton";
import "./HomePage.css";

const trendingTags = [
  { tag: "react", count: "12.4k" },
  { tag: "typescript", count: "9.8k" },
  { tag: "python", count: "7.1k" },
  { tag: "sql", count: "4.3k" },
  { tag: "tailwind", count: "3.9k" },
  { tag: "rust", count: "2.2k" },
];

const filters = ["Trending", "Newest", "Most Forked"];

const HomePage = () => {
  const { isLoggedIn, logoutUser } = useContext(AuthContext);
  const [snippets, setSnippets] = useState([]);
  const [error, setError] = useState(null);

  const [activeFilter, setActiveFilter] = useState(filters[0]);

  useEffect(() => {
    const fetchSnippets = async () => {
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_APP_SERVERURL}/snippets/all?sort=${activeFilter}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (response.status === 401) {
          console.warn("Session expired or invalid token. Logging out...");
          logoutUser();
          return;
        }
        if (!response.ok) {
          throw new Error("Unable to retrieve data from the server.");
        }
        const data = await response.json();

        setSnippets(data.allSnippets);
      } catch (error) {
        console.error("Error loading snippets", error);
        setError(
          "Oops! Something went wrong while loading the feed. Please try again later.",
        );
      }
    };

    if (isLoggedIn) {
      fetchSnippets();
    }
  }, [isLoggedIn, activeFilter, logoutUser]);

  const renderFeedContent = () => {
    if (!isLoggedIn) {
      return (
        <MyCard className="locked-feed-card py-5 mt-2 text-center border-0">
          <MyCardContent className="d-flex flex-column align-items-center gap-3">
            <Lock size={48} className="locked-icon mb-2" />
            <MyCardTitle className="locked-title">
              Log in to view the feed
            </MyCardTitle>
            <p className="locked-subtitle m-0 mb-3">
              Join SnippetVault to explore, share, and fork code snippets from
              developers worldwide.
            </p>
            <Link to="/login" className="locked-login-link">
              <MyButton>Log in to continue</MyButton>
            </Link>
          </MyCardContent>
        </MyCard>
      );
    }

    if (error) {
      return (
        <MyCard className="error-feed-card py-5 mt-2 text-center border-0">
          <MyCardContent className="d-flex flex-column align-items-center gap-3">
            <AlertCircle size={48} className="text-danger mb-2" />
            <MyCardTitle>Failed to load feed</MyCardTitle>
            <p className="error-subtitle m-0 mb-3">{error}</p>
            <MyButton onClick={() => window.location.reload()}>
              Try Again
            </MyButton>
          </MyCardContent>
        </MyCard>
      );
    }

    if (snippets.length === 0) {
      return <EmptyState />;
    }

    return (
      <div className="d-flex flex-column gap-4">
        {snippets.map((snippet) => (
          <SnippetCard key={snippet._id} snippet={snippet} />
        ))}
      </div>
    );
  };
  return (
    <BaseLayout>
      <Container className="py-4 py-md-5">
        <Row className="g-4">
          <Col xs={12} lg={8}>
            <div className="d-flex flex-column gap-4">
              <div className="d-flex align-items-center justify-content-between gap-3">
                <div className="d-flex flex-column">
                  <h1 className="feed-title m-0">Your Feed</h1>
                  <p className="feed-subtitle m-0">
                    Fresh snippets from developers.
                  </p>
                </div>

                {isLoggedIn && (
                  <MyButton className="d-md-none px-3 py-1">
                    <Plus size={16} /> New
                  </MyButton>
                )}
              </div>

              <div className="filters-container">
                {filters.map((filter) => {
                  const isActive = activeFilter === filter;
                  return (
                    <button
                      key={filter}
                      type="button"
                      className={`filter-pill ${isActive ? "active" : ""}`}
                      onClick={() => setActiveFilter(filter)}
                    >
                      {filter}
                    </button>
                  );
                })}
              </div>

              {renderFeedContent()}
            </div>
          </Col>

          <Col lg={4} className="d-none d-lg-flex flex-column gap-4">
            <MyCard>
              <MyCardHeader>
                <MyCardTitle className="aside-card-title d-flex align-items-center gap-2">
                  <TrendingUp size={16} className="text-primary-custom" />
                  Trending Tags
                </MyCardTitle>
              </MyCardHeader>
              <MyCardContent className="d-flex flex-wrap gap-2">
                {trendingTags.map(({ tag, count }) => (
                  <div key={tag} className="trending-badge">
                    #{tag}
                    <span className="trending-count">{count}</span>
                  </div>
                ))}
              </MyCardContent>
            </MyCard>

            <MyCard>
              <MyCardHeader>
                <MyCardTitle className="aside-card-title d-flex align-items-center gap-2">
                  <Flame size={16} className="text-primary-custom" />
                  Snippet of the Day
                </MyCardTitle>
              </MyCardHeader>
              <MyCardContent className="aside-card-content d-flex flex-column gap-2">
                <Link to="/snippet/cn-util" className="snippet-day-link">
                  clear_cache — clear Android's cache
                </Link>
                <p className="m-0 text-secondary">
                  The most forked utility this week with 214 forks and counting.
                </p>
              </MyCardContent>
            </MyCard>

            <p className="aside-footer-text px-1 m-0">
              SnippetVault · Share, explore, and fork code with developers
              worldwide.
            </p>
          </Col>
        </Row>
      </Container>
    </BaseLayout>
  );
};

export default HomePage;
