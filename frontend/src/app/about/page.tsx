"use client";
import React from "react";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { HeartPulse, Users, Target, Zap, Activity, Shield } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 p-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center mb-4">
                        <HeartPulse className="text-blue-600 mr-3" size={32} />
                        <h1 className="text-3xl font-bold text-gray-900">About Organa</h1>
                    </div>
                    <p className="text-gray-600 text-lg">
                        Smart Organ Donation Network & Notification System - Connecting donors and recipients through AI-driven precision.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <HeartPulse className="text-blue-600" size={24} />
                                </div>
                                <div className="ml-4">
                                    <p className="text-2xl font-bold text-gray-900">7</p>
                                    <p className="text-sm text-gray-600">Contributors</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <Activity className="text-green-600" size={24} />
                                </div>
                                <div className="ml-4">
                                    <p className="text-2xl font-bold text-gray-900">137</p>
                                    <p className="text-sm text-gray-600">Commits</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <Shield className="text-purple-600" size={24} />
                                </div>
                                <div className="ml-4">
                                    <p className="text-2xl font-bold text-gray-900">MIT</p>
                                    <p className="text-sm text-gray-600">License</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-orange-100 rounded-lg">
                                    <Users className="text-orange-600" size={24} />
                                </div>
                                <div className="ml-4">
                                    <p className="text-2xl font-bold text-gray-900">8</p>
                                    <p className="text-sm text-gray-600">Forks</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Mission */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center">
                                <Target className="text-blue-600 mr-2" size={20} />
                                <CardTitle>Our Mission</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 leading-relaxed">
                                To revolutionize organ and blood donation by intelligently matching donors with recipients. 
                                Using a proprietary scoring algorithm and generative AI, our system analyzes medical data, 
                                urgency, compatibility, and geographic factors to prioritize and optimize life-saving connections.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Vision */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center">
                                <Zap className="text-blue-600 mr-2" size={20} />
                                <CardTitle>Our Vision</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 leading-relaxed">
                                A world where no patient dies waiting for an organ transplant. We envision a centralized 
                                network that eliminates manual interventions, speeds up organ-sharing processes, and 
                                maximizes every donation opportunity through intelligent technology.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Features */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="text-xl">Key Features</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="flex items-start space-x-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <HeartPulse className="text-blue-600" size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Smart Matching Algorithm</h3>
                                    <p className="text-sm text-gray-600">
                                        Prioritizes matches based on medical compatibility, urgency, and logistics
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <Activity className="text-green-600" size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Real-Time Network</h3>
                                    <p className="text-sm text-gray-600">
                                        Live updates for blood/organ availability and recipient needs
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <Zap className="text-purple-600" size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">AI Analysis</h3>
                                    <p className="text-sm text-gray-600">
                                        Predicts transplant success rates and generates compatibility reports
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="p-2 bg-orange-100 rounded-lg">
                                    <Users className="text-orange-600" size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Centralized Network</h3>
                                    <p className="text-sm text-gray-600">
                                        Allows hospitals to share organs with nearby facilities seamlessly
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="p-2 bg-red-100 rounded-lg">
                                    <Shield className="text-red-600" size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Automated Alerts</h3>
                                    <p className="text-sm text-gray-600">
                                        Notify hospitals, donors, and recipients of critical matches
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="p-2 bg-teal-100 rounded-lg">
                                    <Target className="text-teal-600" size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Analytics Dashboard</h3>
                                    <p className="text-sm text-gray-600">
                                        Track donation trends, success rates, and system performance
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tech Stack */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="text-xl">Technology Stack</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Layer</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Technology</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b">
                                        <td className="py-3 px-4 text-gray-600">Frontend</td>
                                        <td className="py-3 px-4">
                                            <div className="flex flex-wrap gap-2">
                                                <Badge variant="secondary">Next.js</Badge>
                                                <Badge variant="secondary">Shadcn-UI</Badge>
                                                <Badge variant="secondary">Zustand</Badge>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-3 px-4 text-gray-600">Backend</td>
                                        <td className="py-3 px-4">
                                            <div className="flex flex-wrap gap-2">
                                                <Badge variant="secondary">Node.js</Badge>
                                                <Badge variant="secondary">Express</Badge>
                                                <Badge variant="secondary">Socket.io</Badge>
                                                <Badge variant="secondary">Zod</Badge>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-3 px-4 text-gray-600">Database</td>
                                        <td className="py-3 px-4">
                                            <div className="flex flex-wrap gap-2">
                                                <Badge variant="secondary">PostgreSQL</Badge>
                                                <Badge variant="secondary">Prisma</Badge>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-4 text-gray-600">AI / ML</td>
                                        <td className="py-3 px-4">
                                            <div className="flex flex-wrap gap-2">
                                                <Badge variant="secondary">Gemini API</Badge>
                                                <Badge variant="secondary">FastAPI</Badge>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Team */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Project Team</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-4">
                            <Avatar className="w-16 h-16">
                                <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">
                                    SM
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-semibold text-gray-900">Sanchari Mandal</h3>
                                <p className="text-gray-600">Project Maintainer & Lead Developer</p>
                                <div className="flex gap-2 mt-2">
                                    <Badge>Full-Stack Developer</Badge>
                                    <Badge>AI/ML Engineer</Badge>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">
                                <strong>Open Source Project:</strong> Organa welcomes contributions from developers, 
                                healthcare professionals, and anyone passionate about saving lives through technology. 
                                Join our community of 7 active contributors working to revolutionize organ donation.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
