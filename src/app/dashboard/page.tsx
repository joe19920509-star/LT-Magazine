"use client";

import { useState } from "react";
import { Mail, Phone, Lock, User, CheckCircle, AlertCircle } from "lucide-react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

type Status = "idle" | "success" | "error";

export default function DashboardPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");

    if (!isLogin) {
      // Registration validation
      if (!form.name || !form.email || !form.phone || !form.password) {
        setStatus("error");
        setMessage("请填写所有必填项");
        return;
      }
      if (!/^\S+@\S+\.\S+$/.test(form.email)) {
        setStatus("error");
        setMessage("请输入有效的邮箱地址");
        return;
      }
      if (!/^1[3-9]\d{9}$/.test(form.phone)) {
        setStatus("error");
        setMessage("请输入有效的中国手机号");
        return;
      }
      if (form.password.length < 6) {
        setStatus("error");
        setMessage("密码至少需要 6 位");
        return;
      }
      if (form.password !== form.confirmPassword) {
        setStatus("error");
        setMessage("两次输入的密码不一致");
        return;
      }
      // In production: send to API endpoint
      setStatus("success");
      setMessage(
        `注册成功！邮箱 ${form.email} 和手机号 ${form.phone} 已记录。后续登录后将享受个性化内容推荐。`
      );
    } else {
      // Login validation
      if (!form.email || !form.password) {
        setStatus("error");
        setMessage("请填写邮箱和密码");
        return;
      }
      setStatus("success");
      setMessage(`欢迎回来！`);
    }
  };

  return (
    <div className="min-h-screen bg-light py-16">
      <div className="max-w-md mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-heading font-bold text-3xl mb-2">
            {isLogin ? "登录" : "注册"}
          </h1>
          <p className="text-muted">
            {isLogin
              ? "欢迎回到 LTMagazine"
              : "加入 LTMagazine，获取个性化内容"}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          {/* Status Messages */}
          {status !== "idle" && (
            <div
              className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
                status === "success"
                  ? "bg-green-50 text-green-800"
                  : "bg-red-50 text-red-800"
              }`}
            >
              {status === "success" ? (
                <CheckCircle size={20} className="flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
              )}
              <p className="text-sm leading-relaxed">{message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name (register only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-1.5 text-body">
                  姓名 <span className="text-primary">*</span>
                </label>
                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                  />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="请输入姓名"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1.5 text-body">
                邮箱地址 <span className="text-primary">*</span>
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm"
                />
              </div>
            </div>

            {/* Phone (register only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-1.5 text-body">
                  手机号 <span className="text-primary">*</span>
                </label>
                <div className="relative">
                  <Phone
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="1xxxxxxxxx"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm"
                  />
                </div>
                <p className="text-xs text-muted mt-1.5">
                  用于接收重要通知，绝不用于营销推广
                </p>
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1.5 text-body">
                密码 <span className="text-primary">*</span>
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm"
                />
              </div>
            </div>

            {/* Confirm Password (register only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-1.5 text-body">
                  确认密码 <span className="text-primary">*</span>
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm"
                  />
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-heading font-semibold hover:bg-primary/90 transition-colors text-sm tracking-wide"
            >
              {isLogin ? "登录" : "立即注册"}
            </button>
          </form>

          {/* Toggle */}
          <p className="text-center text-sm text-muted mt-6">
            {isLogin ? "还没有账号？" : "已有账号？"}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setStatus("idle");
                setMessage("");
              }}
              className="text-primary font-semibold ml-1 hover:underline"
            >
              {isLogin ? "立即注册" : "登录"}
            </button>
          </p>
        </div>

        {/* Note */}
        <p className="text-center text-xs text-muted mt-6">
          注册即表示同意我们的
          <a href="#" className="text-primary hover:underline mx-1">
            服务条款
          </a>
          和
          <a href="#" className="text-primary hover:underline mx-1">
            隐私政策
          </a>
        </p>
      </div>
    </div>
  );
}
