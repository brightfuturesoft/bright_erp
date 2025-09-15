import React from 'react';
import use_direct_pos from './components/use_direct_pos';
import Left_panel from './components/Left_panel';
import Right_panel from './components/Right_panel';
import Hold_order_modal from './components/Hold_order_modal';
import Pending_orders_modal from './components/Pending_orders_modal';
import Add_customer_modal from './components/Add_customer_modal';
import Payment_completed_modal from './components/Payment_completed_modal';
import Receipt_modal from './components/Receipt_modal';

const Direct_POS = () => {
    const pos = use_direct_pos();

    console.log(pos.heldOrders, 'hold_order');

    return (
        <div className="dark:bg-gray-900 bg-gray-50 text-white">
            <audio
                ref={pos.audioRef}
                preload="auto"
            >
                <source
                    src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmUeBjqH0fPTgjMGHm7A7+OZURE"
                    type="audio/wav"
                />
            </audio>
            <div className="flex h-screen mx-auto max-w-screen-2xl px-4">
                <Left_panel {...pos} />
                <Right_panel {...pos} />
            </div>
            <Hold_order_modal {...pos} />
            <Pending_orders_modal {...pos} />
            <Add_customer_modal {...pos} />
            <Payment_completed_modal {...pos} />
            <Receipt_modal {...pos} />
        </div>
    );
};

export default Direct_POS;
