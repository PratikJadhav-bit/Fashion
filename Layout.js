import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import {
  Sparkles,
  Home,
  User,
  Shirt,
  Calendar,
  History,
  LogOut,
  Menu,
  MessageCircle,
  Cloud,
  Leaf,
  LayoutDashboard,
  Palette,
  Layers,
  Mail,
  Bell,
  ShoppingCart
} from "lucide-react";
import NotificationCenter from "./components/notifications/NotificationCenter";
import { useCart } from "./components/cart/useCart";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigation = [
  { name: "Home", href: "Home", icon: Home },
  { name: "Dashboard", href: "Dashboard", icon: LayoutDashboard },
  { name: "For You", href: "ForYou", icon: Sparkles, featured: true },
  { name: "Discover", href: "Discover", icon: Sparkles },
  { name: "Style Profile", href: "StyleProfile", icon: User },
  { name: "Style DNA Quiz", href: "StyleDNAQuiz", icon: Sparkles },
  { name: "Mood Styler", href: "MoodStyler", icon: Sparkles },
  { name: "Plan Outfit", href: "OccasionPlanner", icon: Calendar },
  { name: "My Wardrobe", href: "MyWardrobe", icon: Shirt },
  { name: "Outfit History", href: "OutfitHistory", icon: History },
  { name: "Style Match", href: "StyleMatch", icon: Sparkles },
  { name: "AI Assistant", href: "StyleAssistant", icon: MessageCircle },
  { name: "Weather Outfits", href: "WeatherOutfits", icon: Cloud },
  { name: "Sustainability", href: "SustainabilityScore", icon: Leaf },
  { name: "Custom Designer", href: "CustomDesigner", icon: Palette },
  { name: "My Designs", href: "MyDesigns", icon: Layers },
  { name: "Community", href: "CommunityGallery", icon: Sparkles },
  { name: "Community Style", href: "CommunityStyle", icon: Sparkles },
  { name: "Marketplace", href: "Marketplace", icon: Sparkles },
  { name: "Messages", href: "Messages", icon: Mail },
  { name: "Fashion Trends", href: "FashionTrends", icon: Sparkles },
  { name: "AI Stylist", href: "VirtualStylist", icon: Sparkles, featured: true },
];

// Admin-only navigation items
const adminNavigation = [
  { name: "Manage Products", href: "ManageAffiliateProducts", icon: Sparkles }
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const { getCartCount } = useCart();

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (error) {
        // User not logged in
      }
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    await base44.auth.logout();
    navigate(createPageUrl("Home"));
  };

  const isActive = (pageName) => {
    return location.pathname === createPageUrl(pageName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-lavender-50 to-sage-50">
      <style>{`
        .from-lavender-50 { --tw-gradient-from: #faf5ff; }
        .to-sage-50 { --tw-gradient-to: #f0fdf4; }
        .text-blush { color: #ff9ebc; }
        .bg-blush { background-color: #ff9ebc; }
        .border-blush { border-color: #ff9ebc; }
        .hover\\:bg-blush:hover { background-color: #ff9ebc; }
      `}</style>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white/80 backdrop-blur-xl px-6 pb-4 shadow-xl border-r border-pink-100">
          <div className="flex h-20 shrink-0 items-center gap-3 pt-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center shadow-lg">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Fashion Hub
              </h1>
              <p className="text-xs text-gray-500">Your Fashion Assistant</p>
            </div>
          </div>
          
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={createPageUrl(item.href)}
                        className={`group flex gap-x-3 rounded-xl p-3 text-sm font-semibold leading-6 transition-all duration-200 ${
                          isActive(item.href)
                            ? "bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 shadow-sm"
                            : item.featured
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                            : "text-gray-600 hover:text-pink-600 hover:bg-pink-50"
                        }`}
                      >
                        <item.icon className="h-5 w-5 shrink-0" />
                        {item.name}
                        {item.featured && (
                          <span className="ml-auto text-xs bg-white/20 px-2 py-0.5 rounded-full">
                            NEW
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}

                  {/* Admin-only items */}
                  {user?.role === 'admin' && (
                    <>
                      <li className="pt-4 mt-4 border-t border-gray-200">
                        <p className="text-xs font-semibold text-gray-400 px-3 mb-2">ADMIN</p>
                      </li>
                      {adminNavigation.map((item) => (
                        <li key={item.name}>
                          <Link
                            to={createPageUrl(item.href)}
                            className={`group flex gap-x-3 rounded-xl p-3 text-sm font-semibold leading-6 transition-all duration-200 ${
                              isActive(item.href)
                                ? "bg-gradient-to-r from-green-100 to-blue-100 text-green-700 shadow-sm"
                                : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                            }`}
                          >
                            <item.icon className="h-5 w-5 shrink-0" />
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </>
                  )}
                </ul>
              </li>
              
              {user && (
                <li className="mt-auto">
                  <div className="flex items-center gap-x-4 px-3 py-3 rounded-xl bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-100">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-white font-semibold shadow-lg">
                      {user.email?.[0]?.toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {user.full_name || "Fashionista"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                  </div>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="w-full mt-2 text-gray-600 hover:text-pink-600 hover:bg-pink-50"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile header */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center gap-x-4 bg-white/90 backdrop-blur-xl px-3 py-3 shadow-sm border-b border-pink-100">
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] sm:w-72 p-0">
            <div className="flex flex-col h-full bg-white overflow-y-auto">
              <div className="flex items-center gap-2.5 p-4 border-b border-pink-100">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                    Fashion Hub
                  </h1>
                  <p className="text-[10px] text-gray-500">Your Fashion Assistant</p>
                </div>
              </div>

              <nav className="flex-1 px-3 py-3">
                <ul className="space-y-0.5">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={createPageUrl(item.href)}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`group flex items-center gap-x-2.5 rounded-lg p-2.5 text-sm font-medium transition-all ${
                          isActive(item.href)
                            ? "bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700"
                            : item.featured
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                            : "text-gray-600 hover:text-pink-600 hover:bg-pink-50 active:bg-pink-100"
                        }`}
                      >
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        <span className="flex-1">{item.name}</span>
                        {item.featured && (
                          <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">
                            NEW
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}

                  {/* Admin-only items */}
                  {user?.role === 'admin' && (
                    <>
                      <li className="pt-3 mt-3 border-t border-pink-200">
                        <p className="text-[10px] font-semibold text-gray-400 px-2.5 mb-1">ADMIN</p>
                      </li>
                      {adminNavigation.map((item) => (
                        <li key={item.name}>
                          <Link
                            to={createPageUrl(item.href)}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`group flex items-center gap-x-2.5 rounded-lg p-2.5 text-sm font-medium transition-all ${
                              isActive(item.href)
                                ? "bg-gradient-to-r from-green-100 to-blue-100 text-green-700"
                                : "text-gray-600 hover:text-green-600 hover:bg-green-50 active:bg-green-100"
                            }`}
                          >
                            <item.icon className="h-4 w-4 flex-shrink-0" />
                            <span className="flex-1">{item.name}</span>
                          </Link>
                        </li>
                      ))}
                    </>
                  )}
                  </ul>
                  </nav>

              {user && (
                <div className="p-3 border-t border-pink-100">
                  <div className="flex items-center gap-x-2.5 px-2.5 py-2.5 rounded-lg bg-gradient-to-r from-pink-50 to-purple-50">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-white font-semibold text-sm">
                      {user.email?.[0]?.toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-900 truncate">
                        {user.full_name || "Fashionista"}
                      </p>
                      <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
                    </div>
                  </div>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    size="sm"
                    className="w-full mt-2 text-xs text-gray-600 hover:text-pink-600 hover:bg-pink-50 h-8"
                  >
                    <LogOut className="h-3 w-3 mr-1.5" />
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-1.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-base font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Fashion Hub
          </h1>
        </div>

        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(createPageUrl("Cart"))}
            className="relative h-9 w-9"
          >
            <ShoppingCart className="w-4 h-4" />
            {getCartCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                {getCartCount()}
              </span>
            )}
          </Button>
          {user && (
            <NotificationCenter userEmail={user.email} />
          )}
        </div>
        </div>

      {/* Main content */}
      <main className="lg:pl-72">
        <div className="min-h-screen pb-16 lg:pb-0">
          {children}
        </div>
      </main>
    </div>
  );
}