package safe_holiday.safe_holiday.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPharmacy is a Querydsl query type for Pharmacy
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPharmacy extends EntityPathBase<Pharmacy> {

    private static final long serialVersionUID = 1809624509L;

    public static final QPharmacy pharmacy = new QPharmacy("pharmacy");

    public final ListPath<Favorite, QFavorite> favoriteList = this.<Favorite, QFavorite>createList("favoriteList", Favorite.class, QFavorite.class, PathInits.DIRECT2);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath pharmacyId = createString("pharmacyId");

    public final ListPath<Review, QReview> reviewList = this.<Review, QReview>createList("reviewList", Review.class, QReview.class, PathInits.DIRECT2);

    public QPharmacy(String variable) {
        super(Pharmacy.class, forVariable(variable));
    }

    public QPharmacy(Path<? extends Pharmacy> path) {
        super(path.getType(), path.getMetadata());
    }

    public QPharmacy(PathMetadata metadata) {
        super(Pharmacy.class, metadata);
    }

}

