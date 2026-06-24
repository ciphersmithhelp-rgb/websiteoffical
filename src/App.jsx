import { Routes, Route } from "react-router-dom";

import IndexPage from "./routes/index";
import StudiosPage from "./routes/studios";
import StudioPage from "./routes/studio";
import VisionPage from "./routes/vision";
import LunaPage from "./routes/products/luna";
import ForgePage from "./routes/products/forge";
import VihaliPage from "./routes/worlds/vihali";
import KochuniPage from "./routes/worlds/kochuni";
import ChakraPage from "./routes/worlds/chakra";
import PrivacyPage from "./routes/legal/privacy";
import TermsPage from "./routes/legal/terms";
import NotFoundPage from "./routes/not-found";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/studios" element={<StudiosPage />} />
      <Route path="/studio" element={<StudioPage />} />
      <Route path="/vision" element={<VisionPage />} />
      <Route path="/products/luna" element={<LunaPage />} />
      <Route path="/products/forge" element={<ForgePage />} />
      <Route path="/worlds/vihali" element={<VihaliPage />} />
      <Route path="/worlds/kochuni" element={<KochuniPage />} />
      <Route path="/worlds/chakra" element={<ChakraPage />} />
      <Route path="/legal/privacy" element={<PrivacyPage />} />
      <Route path="/legal/terms" element={<TermsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
