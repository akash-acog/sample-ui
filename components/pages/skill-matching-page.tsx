"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle,
  X,
  Award,
  User,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { mockEmployees, mockProjects, matchSkills } from "@/lib/mock-data";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";

const avatarGradients = [
  "from-indigo-500 to-purple-600",
  "from-pink-500 to-rose-600",
  "from-blue-500 to-cyan-600",
  "from-green-500 to-emerald-600",
  "from-orange-500 to-amber-600",
  "from-violet-500 to-fuchsia-600",
];
const getGradientForIndex = (index: number) =>
  avatarGradients[index % avatarGradients.length];

export function SkillMatchingPage() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [matchResults, setMatchResults] = useState<any[]>([]);

  const handleProjectSelect = (projectId: string) => {
    setSelectedProjectId(projectId);
    if (!projectId) {
      setMatchResults([]);
      return;
    }
    const project = mockProjects.find((p) => p.id === projectId);
    if (!project) return;

    const results = mockEmployees.map((employee) => {
      const matches = matchSkills(
        employee.skills,
        project.requiredSkills || []
      );
      const matchPercentage =
        project.requiredSkills && project.requiredSkills.length > 0
          ? Math.round(
              ((matches.fullMatch.length /
                (matches.fullMatch.length +
                  matches.partialMatch.length +
                  matches.gap.length)) *
                100) as number
            )
          : 0;
      return {
        employee,
        matches,
        matchPercentage,
        fit:
          matchPercentage === 100
            ? "Perfect"
            : matchPercentage >= 75
            ? "Good"
            : matchPercentage >= 50
            ? "Partial"
            : "Poor",
      };
    });
    setMatchResults(results.sort((a, b) => b.matchPercentage - a.matchPercentage));
  };

  const selectedProject = mockProjects.find((p) => p.id === selectedProjectId);

  // Calculate stats
  const perfectMatches = matchResults.filter(
    (r) => r.fit === "Perfect"
  ).length;
  const goodMatches = matchResults.filter((r) => r.fit === "Good").length;
  const avgMatch =
    matchResults.length > 0
      ? Math.round(
          matchResults.reduce((sum, r) => sum + r.matchPercentage, 0) /
            matchResults.length
        )
      : 0;

  return (
    <div className="space-y-6 animate-fade-in">
      <Alert className="border-primary/20 bg-primary/5">
        <TrendingUp className="h-4 w-4" />
        <AlertDescription>
          Analyze employee skills against project requirements to find the best
          fit for your team
        </AlertDescription>
      </Alert>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Skill Matching</h1>
        <p className="mt-2 text-muted-foreground">
          Find the right talent with AI-powered skill analysis
        </p>
      </div>

      <Card className="border-border/50 shadow-soft">
        <CardHeader>
          <CardTitle>Select Project</CardTitle>
          <CardDescription>
            Choose a project to analyze employee skill matches
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedProjectId} onValueChange={handleProjectSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Select a project to analyze..." />
            </SelectTrigger>
            <SelectContent>
              {mockProjects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.code} - {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {selectedProject && (
        <>
          {/* Project Details */}
          <Card className="border-border/50 shadow-soft">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl">
                    {selectedProject.name}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {selectedProject.description}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge>{selectedProject.status}</Badge>
                  <Badge variant="outline">{selectedProject.priority}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3 text-sm">
                    Required Skills ({selectedProject.requiredSkills?.length || 0})
                  </h4>
                  {selectedProject.requiredSkills &&
                  selectedProject.requiredSkills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.requiredSkills.map((skill, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {skill.name} · {skill.proficiency}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No requirements defined
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Match Statistics */}
          {matchResults.length > 0 && (
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-border/50 shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Perfect Matches
                      </p>
                      <p className="text-3xl font-bold">{perfectMatches}</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-sm">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Good Matches
                      </p>
                      <p className="text-3xl font-bold">{goodMatches}</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-sm">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Average Match
                      </p>
                      <p className="text-3xl font-bold">{avgMatch}%</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-sm">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Employee Match Results - Card Grid */}
          {matchResults.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {matchResults.map((result, index) => {
                const initials = result.employee.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .substring(0, 2)
                  .toUpperCase();
                const gradient = getGradientForIndex(index);
                const fitColor =
                  result.fit === "Perfect"
                    ? "success"
                    : result.fit === "Good"
                    ? "default"
                    : result.fit === "Partial"
                    ? "secondary"
                    : "destructive";

                return (
                  <Card
                    key={result.employee.id}
                    className="border-border/50 shadow-soft hover:shadow-medium transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <div
                          className={`h-12 w-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center shadow-sm flex-shrink-0`}
                        >
                          <span className="text-white font-bold">
                            {initials}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-base truncate">
                            {result.employee.name}
                          </CardTitle>
                          <CardDescription className="text-xs">
                            {result.employee.designation}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Match Score */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge variant={fitColor}>{result.fit} Match</Badge>
                          <span className="text-lg font-bold">
                            {result.matchPercentage}%
                          </span>
                        </div>
                        <Progress
                          value={result.matchPercentage}
                          className="h-2"
                        />
                      </div>

                      {/* Skills Breakdown */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1 text-green-600">
                            <CheckCircle className="h-3 w-3" />
                            <span>Full: {result.matches.fullMatch.length}</span>
                          </div>
                          <div className="flex items-center gap-1 text-orange-600">
                            <AlertCircle className="h-3 w-3" />
                            <span>
                              Partial: {result.matches.partialMatch.length}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-red-600">
                            <X className="h-3 w-3" />
                            <span>Gaps: {result.matches.gap.length}</span>
                          </div>
                        </div>
                      </div>

                      {/* Full Matches */}
                      {result.matches.fullMatch.length > 0 && (
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-muted-foreground">
                            Full Matches
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {result.matches.fullMatch.slice(0, 3).map((m, i) => (
                              <Badge
                                key={i}
                                variant="outline"
                                className="text-xs bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                              >
                                {m.name}
                              </Badge>
                            ))}
                            {result.matches.fullMatch.length > 3 && (
                              <span className="text-xs text-muted-foreground">
                                +{result.matches.fullMatch.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Gaps */}
                      {result.matches.gap.length > 0 && (
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-muted-foreground">
                            Skill Gaps
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {result.matches.gap.slice(0, 3).map((g, i) => (
                              <Badge
                                key={i}
                                variant="outline"
                                className="text-xs bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800"
                              >
                                {g}
                              </Badge>
                            ))}
                            {result.matches.gap.length > 3 && (
                              <span className="text-xs text-muted-foreground">
                                +{result.matches.gap.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {result.matches.gap.length === 0 && (
                        <div className="flex items-center gap-2 text-green-600 text-xs">
                          <Award className="h-4 w-4" />
                          <span className="font-medium">Perfect Fit!</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </>
      )}

      {!selectedProject && (
        <Card className="border-border/50 shadow-soft">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
              <User className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Project Selected</h3>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              Select a project from the dropdown above to analyze employee skill
              matches and find the best candidates for your team.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
