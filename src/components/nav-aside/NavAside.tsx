import React from "react";
import { MenuItemNestableAsFunction } from "@caisy/league";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContent } from "../../hooks/content";

export const NavAside: React.FC = () => {
  const router = useRouter();
  const { NavigationTop } = useContent();

  return (
    <aside>
      <>
        {router.query.slug?.length > 0 ? (
          (NavigationTop as any).items.map((nav) =>
            nav.items.map((category) => {
              return router.query.slug[0] === nav.slug ? (
                <MenuItemNestableAsFunction
                  key={category.id}
                  active={router.query.slug?.[1] === category.slug}
                  collapsed={!router.query.slug?.[1] === category.slug}
                >
                  {category.title}
                  {category.items?.map((article) => (
                    <Link key={article.id} href={`/${nav.slug}/${category.slug}/${article.slug}`}>
                      <MenuItemNestableAsFunction active={router.query.slug?.[2] === article.slug}>
                        {article.headline}
                      </MenuItemNestableAsFunction>
                    </Link>
                  )) ?? null}
                </MenuItemNestableAsFunction>
              ) : null;
            }),
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
