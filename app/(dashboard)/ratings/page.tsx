"use client";

import { useRole } from "@/lib/role-context";
import { useState, useMemo } from "react";
import { performanceReviews } from "@/lib/data/reviews";
import { filterReviewsByRole, hasPermission, getPageTitle } from "@/lib/utils/role-filter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Search, Star, TrendingUp, Target, Award, Shield, Users, Calendar } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

export default function RatingsPage() {
  const { user } = useRole();
  const [searchTerm, setSearchTerm] = useState("");

  if (!user) return null;

  const filteredByRole = useMemo(
    () => filterReviewsByRole(performanceReviews, user, user.id),
    [user]
  );

  const filteredReviews = filteredByRole.filter(
    (review) =>
      review.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.reviewPeriod.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const canCreateReview = hasPermission(user, "review:create");
  const pageTitle = getPageTitle("reviews", user.role);

  const completedReviews = filteredByRole.filter(r => r.status === "Completed").length;
  const avgRating = filteredByRole.reduce((sum, r) => sum + r.overallRating, 0) / (filteredByRole.length || 1);
  const topPerformers = filteredByRole.filter(r => r.overallRating >= 4.5).length;

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600";
    if (rating >= 4.0) return "text-blue-600";
    if (rating >= 3.5) return "text-yellow-600";
    return "text-orange-600";
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Completed": return "success";
      case "Submitted": return "default";
      case "Draft": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Alert className="border-primary/20 bg-primary/5">
        <Shield className="h-4 w-4" />
        <AlertDescription>
          Viewing as <strong className="capitalize">{user.role}</strong> •{" "}
          <strong>{filteredByRole.length}</strong> review{filteredByRole.length !== 1 ? "s" : ""} accessible
        </AlertDescription>
      </Alert>

      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">{pageTitle}</h1>
          <p className="text-muted-foreground">
            {user.role === "employee"
              ? "View your performance reviews and feedback"
              : "Manage and track team performance reviews"}
          </p>
        </div>
        {canCreateReview && (
          <Button className="gap-2 shadow-sm">
            <Plus className="h-4 w-4" />
            New Review
          </Button>
        )}
      </div>

      {user.role !== "employee" && (
        <div className="grid gap-6 md:grid-cols-4">
          <Card className="border-border/50 shadow-soft hover:shadow-medium transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Total Reviews</p>
                  <p className="text-3xl font-bold">{filteredByRole.length}</p>
                  <p className="text-xs text-muted-foreground">All periods</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-sm">
                  <Star className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-soft hover:shadow-medium transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-3xl font-bold">{completedReviews}</p>
                  <p className="text-xs text-muted-foreground">Finalized reviews</p>
                </div>
                <Badge variant="success" className="text-sm px-3 py-1">
                  Done
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-soft hover:shadow-medium transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Avg Rating</p>
                  <p className="text-3xl font-bold">{avgRating.toFixed(1)}</p>
                  <p className="text-xs text-muted-foreground">Out of 5.0</p>
                </div>
                <TrendingUp className="h-12 w-12 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-soft hover:shadow-medium transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Top Performers</p>
                  <p className="text-3xl font-bold">{topPerformers}</p>
                  <p className="text-xs text-muted-foreground">Rating ≥ 4.5</p>
                </div>
                <Award className="h-12 w-12 text-amber-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card className="border-border/50 shadow-soft">
        <CardHeader>
          <CardTitle>Performance Reviews</CardTitle>
          <CardDescription>
            Showing {filteredReviews.length} of {filteredByRole.length} review{filteredByRole.length !== 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by employee name or review period..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredReviews.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Star className="h-12 w-12 mx-auto mb-2 opacity-20" />
                <p>No reviews found</p>
              </div>
            ) : (
              filteredReviews.map((review) => (
                <Card key={review.id} className="border-border/50 hover:shadow-md transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-white font-semibold text-sm">
                            {review.employeeName.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{review.employeeName}</CardTitle>
                            <CardDescription className="flex items-center gap-2">
                              <Calendar className="h-3 w-3" />
                              {review.reviewPeriod} • {new Date(review.reviewDate).toLocaleDateString()}
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusVariant(review.status)}>{review.status}</Badge>
                        <div className={`text-3xl font-bold ${getRatingColor(review.overallRating)}`}>
                          {review.overallRating}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-5 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Technical</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                          <span className="font-semibold">{review.ratings.technical}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Communication</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                          <span className="font-semibold">{review.ratings.communication}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Teamwork</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                          <span className="font-semibold">{review.ratings.teamwork}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Initiative</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                          <span className="font-semibold">{review.ratings.initiative}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Leadership</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                          <span className="font-semibold">{review.ratings.leadership}</span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Strengths</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {review.strengths.map((strength, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-green-600">✓</span>
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {review.comments && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Reviewer Comments</p>
                        <p className="text-sm text-muted-foreground italic">"{review.comments}"</p>
                        <p className="text-xs text-muted-foreground">- {review.reviewerName}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
