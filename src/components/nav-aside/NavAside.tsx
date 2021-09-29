import React from "react";
import { MenuItemNestableAsFunction } from "@caisy/league";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContent } from "../../hooks/content";

export const NavAside: React.FC = () => {
  const router = useRouter();
  const { NavigationTop } = useContent();
  console.log(`useContent NavigationTop props: `, NavigationTop);
  console.log(router.query);

  return (
    <aside>
      <>
        {router.query.slug?.length > 0 ? (
          (NavigationTop as any).items.map((nav) =>
            nav.items.map(
              (category) =>
                router.query.slug[0] === nav.slug && (
                  <MenuItemNestableAsFunction key={category.id} active={router.asPath.includes(category.slug)}>
                    {category.title}
                    {category.items.map((article) => (
                      <Link key={article.id} href={`/${nav.slug}/${category.slug}/${article.slug}`}>
                        <MenuItemNestableAsFunction active={router.asPath.includes(article.slug)}>
                          {article.headline}
                        </MenuItemNestableAsFunction>
                      </Link>
                    ))}
                  </MenuItemNestableAsFunction>
                ),
            ),
          )
        ) : (
          <MenuItemNestableAsFunction
            key={(NavigationTop as any)?.items?.[0]?.id}
            active={router.asPath.includes((NavigationTop as any)?.items?.[0]?.slug)}
          >
            {(NavigationTop as any) && (
              <>
                {(NavigationTop as any).items[0].title}
                {(NavigationTop as any).items[0].items.map((article) => (
                  <Link
                    key={article.id}
                    href={`/${(NavigationTop as any).slug}/${(NavigationTop as any).items[0].slug}/${article.slug}`}
                  >
                    <MenuItemNestableAsFunction active={router.asPath.includes(article.slug)}>
                      {article.headline}
                    </MenuItemNestableAsFunction>
                  </Link>
                ))}
              </>
            )}
          </MenuItemNestableAsFunction>
        )}
      </>
    </aside>
  );
};
