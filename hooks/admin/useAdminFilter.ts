import { AdminTab } from '@/hooks/useAdminData';
import {
  Product,
  Order,
  CartOrder,
  User,
  JoinRequest,
  NewsletterSubscriber,
  ContactForm,
  GasPrice,
} from '@/types';

type StatusFilter = 'all' | 'pending' | 'completed';

type Params = {
  activeTab: AdminTab;
  query: string;
  statusFilter: StatusFilter;
  products: Product[];
  orders: Order[];
  cartOrder: CartOrder[];
  users: User[];
  joinRequests: JoinRequest[];
  newsletterSubscribers: NewsletterSubscriber[];
  contactForms: ContactForm[];
  gasPrices: GasPrice[];
};

/**
 * IMPORTANT:
 * Return type must be a UNION of all possible arrays
 * because activeTab is dynamic at runtime
 */
type FilteredResult =
  | Product[]
  | Order[]
  | CartOrder[]
  | User[]
  | JoinRequest[]
  | NewsletterSubscriber[]
  | ContactForm[]
  | GasPrice[];

export function useAdminFilter({
  activeTab,
  query,
  statusFilter,
  products,
  orders,
  cartOrder,
  users,
  joinRequests,
  newsletterSubscribers,
  contactForms,
  gasPrices,
}: Params): FilteredResult {
  const q = query.trim().toLowerCase();

  switch (activeTab) {
    case 'products':
      return products.filter((p) =>
        `${p.title ?? ''} ${p.subtitle ?? ''} ${p.description ?? ''} ${
          p.seller_name ?? ''
        }`
          .toLowerCase()
          .includes(q)
      );

    case 'orders':
      return orders.filter((o) => {
        const hay = `${o.full_name ?? ''} ${o.phone ?? ''} ${o.city ?? ''} ${
          o.state ?? ''
        } ${o.address ?? ''}`.toLowerCase();

        const status = (o.status ?? 'pending') as 'pending' | 'completed';

        return (
          hay.includes(q) && (statusFilter === 'all' || status === statusFilter)
        );
      });

    case 'cart_order':
      return cartOrder.filter((o) => {
        const hay = `${o.name ?? ''} ${o.phonenumber ?? ''} ${
          o.address ?? ''
        } ${o.delivery_method ?? ''}`.toLowerCase();

        const status = (o.status ?? 'pending') as 'pending' | 'completed';

        return (
          hay.includes(q) && (statusFilter === 'all' || status === statusFilter)
        );
      });

    case 'users':
      return users.filter((u) =>
        `${u.full_name ?? ''} ${u.phone ?? ''} ${u.city ?? ''} ${u.state ?? ''}`
          .toLowerCase()
          .includes(q)
      );

    case 'join_requests':
      return joinRequests.filter((r) =>
        `${r.full_name ?? ''} ${r.phone ?? ''} ${r.city ?? ''} ${
          r.state ?? ''
        } ${r.role ?? ''} ${r.message ?? ''}`
          .toLowerCase()
          .includes(q)
      );

    case 'newsletter_subscribers':
      return newsletterSubscribers.filter((n) =>
        (n.email ?? '').toLowerCase().includes(q)
      );

    case 'contact_forms':
      return contactForms.filter((c) =>
        `${c.full_name ?? ''} ${c.city ?? ''} ${c.state ?? ''} ${
          c.message ?? ''
        } ${c.gas_info ?? ''}`
          .toLowerCase()
          .includes(q)
      );

    case 'gas_prices':
      return gasPrices.filter((g) =>
        `${g.kg} ${g.amount}`.toLowerCase().includes(q)
      );

    default:
      // TS exhaustiveness safety
      return [];
  }
}
