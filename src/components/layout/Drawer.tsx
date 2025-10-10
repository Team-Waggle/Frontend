import { useFilterStore } from '../../stores/filterStore';
import { motion, AnimatePresence } from 'framer-motion';

/*
모바일 화면에서 보여줄 Drawer UI
children은 Drawer안에 Component를 넣어주면 됩니다.

Drawer UI 예시

모바일 화면에서 Drawer 보여주기
  <div className="md:hidden">
    <Drawer>
      <SideFilters />
    </Drawer>
  </div>
모바일 화면에서 Drawer 가리기
  <div className="hidden md:block">
    <SideFilters />
  </div> 
*/

interface DrawerProps {
  children: React.ReactNode;
}

const Drawer = ({ children }: DrawerProps) => {
  const { isOpen, close } = useFilterStore();

  return (
    <AnimatePresence>
      {/* isOpen이 true일 때만 컴포넌트들을 렌더링합니다. */}
      {isOpen && (
        <>
          <motion.div
            className="fixed bottom-0 left-0 right-0 top-[7rem] z-40 bg-black/40 md:hidden"
            onClick={close}
            // 오버레이가 서서히 나타났다 사라지는 애니메이션
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          {/* 오른쪽으로 슬라이드되는 드로어 애니메이션 */}
          <motion.aside
            className="fixed left-0 top-[7rem] z-50 h-full w-[29rem] max-w-[30rem] bg-white md:hidden"
            // 애니메이션 상태를 정의합니다.
            initial={{ x: '-100%' }} // 왼쪽 화면 밖에서 시작
            animate={{ x: 0 }} // 원래 위치(left-0)로 슬라이드
            exit={{ x: '-100%' }} // 닫힐 때 다시 화면 밖으로 슬라이드
            transition={{ type: 'tween', duration: 0.3 }}
          >
            {children}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
